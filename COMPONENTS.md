# 📚 Custom Components, Hooks, and Utilities

## Components

### `<TestServer />`

Displays the status, usage, and connection info for the public test Minecraft server.

- **Props:** none
- **Usage:** Handles loading, error, and status display. Uses `usePterodactyl` hook.

### `<PricingPlans />`

Shows available hosting plans and their features.

### `<Addons />`

Lists optional add-ons for server plans.

### `<Contact />`

Provides contact options (Discord, WhatsApp, Email).

### `<CopyNotification />`

Shows a toast/notification when a value is copied to clipboard.

---

## Hooks

### `usePterodactyl`

Custom hook for fetching and managing Pterodactyl server status and actions.

- **Returns:** `{ status, loading, error, startServer, stopServer }`

### `useGoogleAnalytics`

Injects Google Analytics 4 tracking on mount.

### `useLanguage`

Provides the current language and a setter for translations.

---

## Utilities

### `formatBytes(bytes: number): string`

Converts a byte value to a human-readable string (e.g., `1.5 GB`).

### `languagesConfig`

Object containing all translations and language metadata.

---

**For each new component, hook, or utility, add:**

- A short description of what it does
- Its main props/arguments and return values
- Example usage if helpful

See the `src/components/`, `src/hooks/`, and `src/utils/` folders for full source and more details.
