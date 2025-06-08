// Import language configuration objects for each supported language
import en from './en';
import de from './de';
import fr from './fr';
import pt from './pt';
import it from './it';

// Aggregate all language configs into a single object for easy access
const languages = {
  en, // English
  de, // German
  fr, // French
  pt, // Portuguese (Brazil)
  it, // Italian
};

// Export the languages object for use throughout the app (e.g., for i18n)
export default languages;
