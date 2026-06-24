import { useEffect } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";

/**
 * Injects Meta Pixel, Google Analytics (GA4), Google Tag Manager, TikTok Pixel
 * and any custom <head> snippet stored under the "tracking" site_content section.
 * Tags are injected once per id; navigations re-fire pageviews when the values
 * are already loaded.
 */
export function TrackingPixels() {
  const { getSection, isLoading } = useSiteContent();

  useEffect(() => {
    if (isLoading) return;
    const t = (getSection("tracking") ?? {}) as Record<string, string>;

    const id = (v?: string) => (v ?? "").trim();

    // ---------- Meta / Facebook Pixel ----------
    const metaId = id(t.meta_pixel_id);
    if (metaId && !document.getElementById("meta-pixel-script")) {
      const s = document.createElement("script");
      s.id = "meta-pixel-script";
      s.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaId}');fbq('track','PageView');`;
      document.head.appendChild(s);
    }

    // ---------- Google Analytics 4 (gtag) ----------
    const gaId = id(t.google_analytics_id);
    if (gaId && !document.getElementById("ga-script")) {
      const s1 = document.createElement("script");
      s1.id = "ga-script";
      s1.async = true;
      s1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(s1);
      const s2 = document.createElement("script");
      s2.id = "ga-init";
      s2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config','${gaId}');`;
      document.head.appendChild(s2);
    }

    // ---------- Google Tag Manager ----------
    const gtmId = id(t.google_tag_id);
    if (gtmId && !document.getElementById("gtm-script")) {
      const s = document.createElement("script");
      s.id = "gtm-script";
      s.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`;
      document.head.appendChild(s);
    }

    // ---------- TikTok Pixel ----------
    const ttId = id(t.tiktok_pixel_id);
    if (ttId && !document.getElementById("tiktok-pixel-script")) {
      const s = document.createElement("script");
      s.id = "tiktok-pixel-script";
      s.innerHTML = `!function (w, d, t) {w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load('${ttId}');ttq.page();}(window, document, 'ttq');`;
      document.head.appendChild(s);
    }

    // ---------- Custom <head> snippet ----------
    const custom = id(t.custom_head_html);
    if (custom && !document.getElementById("custom-head-snippet")) {
      const wrap = document.createElement("div");
      wrap.id = "custom-head-snippet";
      wrap.style.display = "none";
      // Use a template to parse and append child nodes (scripts must be re-created to execute).
      const template = document.createElement("template");
      template.innerHTML = custom;
      template.content.childNodes.forEach((node) => {
        if (node.nodeName === "SCRIPT") {
          const orig = node as HTMLScriptElement;
          const s = document.createElement("script");
          for (const a of Array.from(orig.attributes)) s.setAttribute(a.name, a.value);
          s.text = orig.text;
          document.head.appendChild(s);
        } else {
          document.head.appendChild(node.cloneNode(true));
        }
      });
    }
  }, [isLoading, getSection]);

  return null;
}
