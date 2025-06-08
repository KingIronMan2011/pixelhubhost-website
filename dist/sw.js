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
        { url: 'assets/AboutUs-BSYpQ1_c.js', revision: null },
        { url: 'assets/browser-Dx5ZwVrk.js', revision: null },
        { url: 'assets/index-CTs-78PN.css', revision: null },
        { url: 'assets/index-j83K2OOc.js', revision: null },
        { url: 'assets/Legal-DvDWPCpG.js', revision: null },
        { url: 'assets/NotFound-DWxfSID5.js', revision: null },
        { url: 'assets/Privacy-D_rUyCjl.js', revision: null },
        { url: 'assets/Sitemap-CGyrujpf.js', revision: null },
        { url: 'assets/Terms-CHcouki3.js', revision: null },
        { url: 'assets/UnderConstruction-yQExy_4B.js', revision: null },
        { url: 'favicon-96x96.png', revision: 'ced9914344e1f99415f3d545b51a2a90' },
        { url: 'favicon.ico', revision: 'c7ab84f4c4b9e9534681ac9e28f479e2' },
        { url: 'favicon.svg', revision: 'e47df3a51c3073a68e6514ab7fa551f8' },
        { url: 'index.html', revision: 'cbdaf8a048448d12a7a59b422b60d444' },
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
