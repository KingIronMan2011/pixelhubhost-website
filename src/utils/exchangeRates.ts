// Utility to fetch and cache exchange rates from Open-Meteo (open.er-api.com)
import axios from "axios";

let cachedRates: Record<string, number> = {};
let lastFetch = 0;
const CACHE_DURATION = 1000 * 60 * 60 * 6; // 6 hours

export async function getExchangeRates(
  base = "BRL",
): Promise<Record<string, number>> {
  const now = Date.now();
  if (cachedRates && now - lastFetch < CACHE_DURATION) {
    return cachedRates;
  }
  const res = await axios.get(`https://open.er-api.com/v6/latest/${base}`);
  cachedRates = res.data.rates ?? {};
  lastFetch = now;
  return cachedRates;
}
