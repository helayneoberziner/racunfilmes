
-- Restrict storage bucket listing to admins (public URLs continue to work on public buckets)
DROP POLICY IF EXISTS "Anyone can view portfolio files" ON storage.objects;
DROP POLICY IF EXISTS "Public can read site assets" ON storage.objects;

CREATE POLICY "Admins can list portfolio files" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can list site assets" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'::public.app_role));
