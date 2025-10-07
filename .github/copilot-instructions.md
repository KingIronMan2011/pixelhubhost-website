# Copilot Instructions for PixelHub Host Website

## Project Overview

This is a React + TypeScript website for **PixelHub Host**, a premium Minecraft server hosting service. The site features multilingual support, modern animations, and a responsive design.

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom gradients and dark mode
- **Animations**: Framer Motion
- **Routing**: React Router v7
- **Icons**: Lucide React
- **State Management**: React Context
- **Notifications**: React Toastify and React Hot Toast

## Coding Standards

### TypeScript

- Use TypeScript for all new files (`.tsx` for React components, `.ts` for utilities)
- Prefer explicit typing over `any`
- Use interfaces for component props
- Use type inference where obvious

### React Components

- Use functional components with hooks
- Follow the existing pattern: import React types, use `React.FC` for functional components
- Name files with PascalCase matching the component name
- Export components as default

### Styling

- Use Tailwind CSS utility classes for styling
- Follow the existing dark mode pattern: `dark:` prefix for dark theme styles
- Use Framer Motion for animations (see existing patterns in components)
- Common animation pattern:
  ```tsx
  whileHover={{ scale: 1.045, transition: { duration: 0.13, ease: 'easeInOut' } }}
  ```

### Code Style

- Use double quotes for strings
- Use 2 spaces for indentation
- Run `npm run lint` to fix linting issues
- Run `npm run format` to format code with Prettier
- Follow existing code patterns in the repository

## File Organization

```
src/
├── components/       # Reusable React components
├── pages/           # Page components (routed views)
├── config/          # Configuration files
│   ├── languages/   # Translation files (en.ts, de.ts, pt.ts, fr.ts, it.ts)
│   ├── plans.ts     # Hosting plan configurations
│   └── ...
├── context/         # React Context providers
├── utils/           # Utility functions
└── App.tsx          # Main app component
```

## Multilingual Support

- The site supports: English, German (de), Portuguese (pt), French (fr), Italian (it)
- All translation files are in `src/config/languages/`
- **Important**: When adding new user-facing text, add translations to ALL language files
- Use the `useLanguage()` hook to access translations: `const { language, setLanguage, texts } = useLanguage();`
- Reference translations like: `texts.keyName`

## Development Workflow

### Commands

```bash
npm run dev      # Start development server on http://localhost:5173
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Lint and auto-fix code
npm run format   # Format code with Prettier
```

### Before Committing

1. Test your changes locally with `npm run dev`
2. Run `npm run lint` to check for issues
3. Run `npm run build` to ensure production build works
4. If you added new text, ensure all 5 language files are updated

## Common Patterns

### Component Structure

```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const MyComponent: React.FC = () => {
  const { texts } = useLanguage();
  
  return (
    <section className="bg-white dark:bg-gray-900 transition-colors">
      <motion.div whileHover={{ scale: 1.05 }}>
        {texts.myTranslationKey}
      </motion.div>
    </section>
  );
};

export default MyComponent;
```

### Animation Patterns

- Hover effects: `scale: 1.045` with `duration: 0.13`
- Tap effects (mobile): `scale: 1.04`
- Use `willChange` for performance: `style={{ willChange: 'transform, color' }}`

### Dark Mode

- Always provide dark mode variants using `dark:` prefix
- Common pattern: `bg-white dark:bg-gray-900 text-gray-900 dark:text-white`

## Important Notes

- **Contact Information**: Discord (https://discord.gg/mquaVhs5sr), Email (contato@pixelhubhost.com), WhatsApp (+55 16 99398-1473)
- **Company**: Located in Igarapava, São Paulo, Brazil
- **Pricing**: Base currency is BRL (Brazilian Real), with exchange rate conversion
- **Test Server**: Domain format is `test.pixelhubhost.com` with Bedrock port `19132`
- **Plans**: Wood, Stone, Iron, Dragon tiers with different specs (threads, RAM, storage, etc.)

## Testing

- Manual testing required - no automated test suite currently
- Test in both light and dark modes
- Test responsive design on mobile, tablet, and desktop
- Verify all language translations work correctly

## Dependencies Management

- Use npm for package management
- Check package.json before adding new dependencies
- Prefer existing libraries already in use (e.g., use Lucide React for icons, not a new icon library)

## Best Practices

1. **Keep changes minimal** - Don't refactor unrelated code
2. **Follow existing patterns** - Match the style and structure of existing code
3. **Translations first** - Always add translations when adding UI text
4. **Test locally** - Always test in the browser before committing
5. **Dark mode support** - Every UI change needs dark mode styling
6. **Responsive design** - Ensure mobile, tablet, and desktop compatibility
7. **Performance** - Use Framer Motion's `willChange` for animated elements
8. **Accessibility** - Use semantic HTML and ARIA labels where appropriate

## Known Issues

- Some pre-existing linting warnings (unused variables, no-undef for global objects)
- These are not blockers but should be fixed eventually
- Don't introduce new linting errors

## External Links

- Website: https://www.pixelhubhost.com
- GitHub: https://github.com/KingIronMan2011/pixelhubhost-website
- License: MIT (see LICENSE.txt)

## Additional Resources

- TODOs tracked in TODO.md
- Contribution guidelines in README.md
- Project uses `.env` file (copy from `.env.example`)
