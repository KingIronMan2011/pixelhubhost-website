## TODOs:
 **Error Boundaries:**
 -Add React error boundaries to catch unexpected errors and show a friendly message.

 **SEO & Accessibility:**
 -Make sure all pages have proper <title> and <meta> tags (your MetaTags component helps).
 -Use alt attributes for all images.
 -Use semantic HTML (headings, lists, etc.).

 **Loading & Empty States:**
 -Show loading indicators when fetching data.
 -Handle empty states (e.g., no data to display).

 **Security:**
 -Sanitize any user input/output to prevent XSS.
 -Never expose secrets or sensitive data in the frontend.

 **Performance:**
 -Optimize images and assets.
 -Use code splitting/lazy loading for large pages or components.

 **Dependencies:**
 -Remove unused dependencies from package.json.
 -Keep dependencies up to date.


## Not really TODOs just checking:**
 **Internationalization (i18n) Coverage:**
 -Ensure all user-facing strings are translated and no hardcoded text remains.
 -Check for missing translation keys in all languages.

 **Consistent Theming:**
 -Make sure your dark/light mode works everywhere.
 -Check for color contrast and accessibility.

 **Deployment Readiness:**
 -Check your vite.config.ts or build config for correct base paths.
 -Set up proper redirects for SPA routing (especially for 404s) on your host.

