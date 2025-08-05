/**
 * Map language code to currency code.
 */
export const langToCurrency: Record<string, string> = {
  en: 'USD',
  pt: 'BRL',
  de: 'EUR',
  fr: 'EUR',
  it: 'EUR',
};

/**
 * Get the currency code for a given language.
 * @param lang Language code (e.g. "en", "de", "pt")
 * @returns Currency code (e.g. "USD", "EUR")
 */
export function getCurrencyCodeForLang(lang: string): string {
  return langToCurrency[lang] || 'USD';
}

/**
 * Get the currency symbol for a given currency code.
 * @param currency Currency code (e.g. "USD", "EUR")
 * @returns The currency symbol (e.g. "$", "€", "R$")
 */
export function getCurrencySymbol(currency: string): string {
  switch (currency) {
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    case 'BRL':
      return 'R$';
    case 'GBP':
      return '£';
    default:
      return currency;
  }
}

/**
 * Convert a price from the base currency to the target currency using exchange rates.
 * @param priceInBase Price in base currency (number)
 * @param currencyCode Target currency code (e.g. "USD", "EUR")
 * @param exchangeRates Exchange rates object, e.g. { USD: 1, EUR: 0.92, ... }
 * @returns Converted price (number)
 */
export function convertPrice(
  priceInBase: number,
  currencyCode: string,
  exchangeRates: Record<string, number>,
): number {
  const rate = exchangeRates[currencyCode] || 1;
  return priceInBase * rate;
}
