
-- Restore grants on public tables (lost in prior hardening migration)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT SELECT ON public.profiles TO anon;
GRANT ALL ON public.profiles TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT INSERT ON public.leads TO anon;
GRANT ALL ON public.leads TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.team_members TO authenticated;
GRANT SELECT ON public.team_members TO anon;
GRANT ALL ON public.team_members TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.portfolio_photos TO authenticated;
GRANT SELECT ON public.portfolio_photos TO anon;
GRANT ALL ON public.portfolio_photos TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.portfolio_videos TO authenticated;
GRANT SELECT ON public.portfolio_videos TO anon;
GRANT ALL ON public.portfolio_videos TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT SELECT ON public.site_content TO anon;
GRANT ALL ON public.site_content TO service_role;

-- Restore EXECUTE on security-definer functions used by RLS / triggers
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, anon, service_role;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO authenticated, service_role;
