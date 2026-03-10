
-- Create public bucket for site assets (logos, etc.)
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload to site-assets
CREATE POLICY "Authenticated users can upload site assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'site-assets');

-- Allow authenticated users to update site assets
CREATE POLICY "Authenticated users can update site assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'site-assets');

-- Allow authenticated users to delete site assets
CREATE POLICY "Authenticated users can delete site assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'site-assets');

-- Allow public read access to site assets
CREATE POLICY "Public can read site assets"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'site-assets');
