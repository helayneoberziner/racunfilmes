import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Role = "super_admin" | "admin" | "editor" | "user";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const ANON = Deno.env.get("SUPABASE_ANON_KEY")!;
    const SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace("Bearer ", "");
    if (!token) return json({ error: "Unauthorized" }, 401);

    const userClient = createClient(SUPABASE_URL, ANON, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: uErr } = await userClient.auth.getUser(token);
    if (uErr || !userData.user) return json({ error: "Unauthorized" }, 401);

    const admin = createClient(SUPABASE_URL, SERVICE);

    // Verify caller is super_admin
    const { data: roleRow } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "super_admin")
      .maybeSingle();
    if (!roleRow) return json({ error: "Forbidden — super_admin only" }, 403);

    const body = await req.json().catch(() => ({}));
    const action = body.action as string;

    if (action === "list") {
      const { data: usersList, error } = await admin.auth.admin.listUsers({ perPage: 200 });
      if (error) throw error;
      const ids = usersList.users.map((u) => u.id);
      const { data: roles } = await admin
        .from("user_roles")
        .select("user_id, role")
        .in("user_id", ids);
      const map = new Map<string, Role[]>();
      (roles ?? []).forEach((r: any) => {
        const arr = map.get(r.user_id) ?? [];
        arr.push(r.role);
        map.set(r.user_id, arr);
      });
      return json({
        users: usersList.users.map((u) => ({
          id: u.id,
          email: u.email,
          created_at: u.created_at,
          last_sign_in_at: u.last_sign_in_at,
          roles: map.get(u.id) ?? [],
        })),
      });
    }

    if (action === "invite") {
      const email = String(body.email ?? "").trim().toLowerCase();
      const role = (body.role ?? "editor") as Role;
      const password = String(body.password ?? "");
      if (!email || !password || password.length < 8)
        return json({ error: "Email e senha (mín. 8 caracteres) obrigatórios" }, 400);
      if (!["super_admin", "admin", "editor"].includes(role))
        return json({ error: "Role inválida" }, 400);

      const { data: created, error } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });
      if (error) throw error;

      // handle_new_user trigger inserts 'user' role automatically. Add elevated role:
      const { error: rErr } = await admin
        .from("user_roles")
        .insert({ user_id: created.user!.id, role });
      if (rErr) throw rErr;

      return json({ ok: true, user_id: created.user!.id });
    }

    if (action === "set_role") {
      const userId = String(body.user_id ?? "");
      const role = body.role as Role;
      if (!userId || !["super_admin", "admin", "editor"].includes(role))
        return json({ error: "Parâmetros inválidos" }, 400);

      // Remove elevated roles, then insert the new one
      await admin
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .in("role", ["super_admin", "admin", "editor"]);
      const { error } = await admin.from("user_roles").insert({ user_id: userId, role });
      if (error) throw error;
      return json({ ok: true });
    }

    if (action === "remove_access") {
      const userId = String(body.user_id ?? "");
      if (!userId) return json({ error: "user_id obrigatório" }, 400);
      if (userId === userData.user.id)
        return json({ error: "Não é possível remover o próprio acesso" }, 400);
      await admin
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .in("role", ["super_admin", "admin", "editor"]);
      return json({ ok: true });
    }

    if (action === "delete_user") {
      const userId = String(body.user_id ?? "");
      if (!userId) return json({ error: "user_id obrigatório" }, 400);
      if (userId === userData.user.id)
        return json({ error: "Não é possível excluir a si mesmo" }, 400);
      const { error } = await admin.auth.admin.deleteUser(userId);
      if (error) throw error;
      return json({ ok: true });
    }

    return json({ error: "Ação desconhecida" }, 400);
  } catch (e: any) {
    console.error("manage-users error:", e);
    return json({ error: e.message ?? "Erro interno" }, 500);
  }
});
