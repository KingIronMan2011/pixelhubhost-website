## TODOs

### Error Boundaries

- [ ] Add React error boundaries to catch unexpected errors and show a friendly message.

### SEO & Accessibility

- [ ] Make sure all pages have proper `<title>` and `<meta>` tags (your MetaTags component helps).
- [ ] Use `alt` attributes for all images.
- [ ] Use semantic HTML (headings, lists, etc.).

### Loading & Empty States

- [x] Show loading indicators when fetching data.
- [x] Handle empty states (e.g., no data to display).

### Security

- [x] Sanitize any user input/output to prevent XSS.
- [x] Never expose secrets or sensitive data in the frontend.

### Performance

- [ ] Optimize images and assets.
- [ ] Use code splitting/lazy loading for large pages or components.

### Dependencies

- [x] Remove unused dependencies from `package.json`.
- [x] Keep dependencies up to date.

---

## Not really TODOs, just checking

### Internationalization (i18n) Coverage

- [x] Ensure all user-facing strings are translated and no hardcoded text remains.
- [x] Check for missing translation keys in all languages.

### Consistent Theming

- [x] Make sure your dark/light mode works everywhere.
- [x] Check for color contrast and accessibility.

### Deployment Readiness

- [x] Check your `vite.config.ts` or build config for correct base paths.
- [x] Set up proper redirects for SPA routing (especially for 404s) on your host.
