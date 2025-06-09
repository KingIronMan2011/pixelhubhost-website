<<<<<<< HEAD
if (!self.define) {
  let e,
    s = {};
  const i = (i, n) => (
    (i = new URL(i + '.js', n).href),
    s[i] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = i), (e.onload = s), document.head.appendChild(e);
        } else (e = i), importScripts(i), s();
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, r) => {
    const l = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[l]) return;
    let o = {};
    const t = (e) => i(e, l),
      u = { module: { uri: l }, exports: o, require: t };
    s[l] = Promise.all(n.map((e) => u[e] || t(e))).then((e) => (r(...e), o));
  };
}
define(['./workbox-5ffe50d4'], function (e) {
  'use strict';
  self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: 'apple-touch-icon.png', revision: '9e97845765cdabaef2815b18941fe066' },
        { url: 'assets/AboutUs-DekW1aRi.js', revision: null },
        { url: 'assets/browser-Dr4ryVcA.js', revision: null },
        { url: 'assets/index-BE3HmOvz.css', revision: null },
        { url: 'assets/index-CKc9R_qi.js', revision: null },
        { url: 'assets/Legal-0yZpX4W7.js', revision: null },
        { url: 'assets/NotFound-Dq0Id6Yp.js', revision: null },
        { url: 'assets/Privacy-B4IzpNpI.js', revision: null },
        { url: 'assets/Sitemap-lq9zGbX7.js', revision: null },
        { url: 'assets/Terms-CnwY_i0g.js', revision: null },
        { url: 'assets/UnderConstruction-DHyAMO_i.js', revision: null },
        { url: 'favicon-96x96.png', revision: 'ced9914344e1f99415f3d545b51a2a90' },
        { url: 'favicon.ico', revision: 'c7ab84f4c4b9e9534681ac9e28f479e2' },
        { url: 'favicon.svg', revision: 'e47df3a51c3073a68e6514ab7fa551f8' },
        { url: 'index.html', revision: '3608feccf89767ef895e4e18d033cb79' },
        { url: 'registerSW.js', revision: '1872c500de691dce40960bb85481de07' },
        { url: 'web-app-manifest-192x192.png', revision: '12adf53db35f175db79c1338187207e6' },
        { url: 'web-app-manifest-512x512.png', revision: 'd98db84943393bdf15d529737f84eb66' },
        { url: 'manifest.webmanifest', revision: '25f390616a95f7ee534769cf750650d7' },
      ],
      {},
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL('index.html')));
});
=======
if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const t=e=>i(e,l),u={module:{uri:l},exports:o,require:t};s[l]=Promise.all(n.map((e=>u[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"apple-touch-icon.png",revision:"9e97845765cdabaef2815b18941fe066"},{url:"assets/AboutUs-EEI244FM.js",revision:null},{url:"assets/browser-D3v7sd6t.js",revision:null},{url:"assets/index-BE3HmOvz.css",revision:null},{url:"assets/index-DMUyVEOA.js",revision:null},{url:"assets/Legal-Ij-Ui4KL.js",revision:null},{url:"assets/NotFound-6Ed1_BjR.js",revision:null},{url:"assets/Privacy-DMDe_yOz.js",revision:null},{url:"assets/Sitemap-hy5rIXyG.js",revision:null},{url:"assets/Terms-RpSxsF6r.js",revision:null},{url:"assets/UnderConstruction-DRzw37nY.js",revision:null},{url:"favicon-96x96.png",revision:"ced9914344e1f99415f3d545b51a2a90"},{url:"favicon.ico",revision:"c7ab84f4c4b9e9534681ac9e28f479e2"},{url:"favicon.svg",revision:"e47df3a51c3073a68e6514ab7fa551f8"},{url:"index.html",revision:"cde80c4af4add8be33b837b1db0d1d72"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"web-app-manifest-192x192.png",revision:"12adf53db35f175db79c1338187207e6"},{url:"web-app-manifest-512x512.png",revision:"d98db84943393bdf15d529737f84eb66"},{url:"manifest.webmanifest",revision:"25f390616a95f7ee534769cf750650d7"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
>>>>>>> 683a8fe8581602ad5045b391714f7a4a26c219cb
