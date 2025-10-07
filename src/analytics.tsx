import { useEffect } from 'react';

const GA_MEASUREMENT_ID = 'G-G2Q7J5CB6C'; // Your GA4 Measurement ID

interface WindowWithGtag {
  dataLayer: unknown[];
  gtag: (..._args: unknown[]) => void;
}

declare let window: WindowWithGtag & typeof globalThis;

export function useGoogleAnalytics() {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    // Inject GA script
    if (!document.getElementById('ga-script')) {
      const script = document.createElement('script');
      script.id = 'ga-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      }
      window.gtag = gtag;

      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID);
    }
  }, []);
}
