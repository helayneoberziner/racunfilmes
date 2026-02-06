-- Create portfolio_videos table
CREATE TABLE public.portfolio_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  video_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create portfolio_photos table
CREATE TABLE public.portfolio_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_photos ENABLE ROW LEVEL SECURITY;

-- RLS Policies for portfolio_videos
CREATE POLICY "Anyone can view active videos"
ON public.portfolio_videos
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can view all videos"
ON public.portfolio_videos
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert videos"
ON public.portfolio_videos
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update videos"
ON public.portfolio_videos
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete videos"
ON public.portfolio_videos
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for portfolio_photos
CREATE POLICY "Anyone can view active photos"
ON public.portfolio_photos
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can view all photos"
ON public.portfolio_photos
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert photos"
ON public.portfolio_photos
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update photos"
ON public.portfolio_photos
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete photos"
ON public.portfolio_photos
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Triggers for updated_at
CREATE TRIGGER update_portfolio_videos_updated_at
BEFORE UPDATE ON public.portfolio_videos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portfolio_photos_updated_at
BEFORE UPDATE ON public.portfolio_photos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true);

-- Storage policies for portfolio bucket
CREATE POLICY "Anyone can view portfolio files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'portfolio');

CREATE POLICY "Admins can upload portfolio files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'portfolio' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update portfolio files"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'portfolio' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete portfolio files"
ON storage.objects
FOR DELETE
USING (bucket_id = 'portfolio' AND has_role(auth.uid(), 'admin'::app_role));