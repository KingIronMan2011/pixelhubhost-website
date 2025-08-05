import axios from 'axios';

const API_URL = 'https://api.exchangerate-api.com/v4/latest/BRL'; // Replace with your preferred API

export const getExchangeRates = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.rates; // Returns exchange rates for all currencies
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw new Error('Failed to fetch exchange rates');
  }
};

export const convertPrice = (amountInBRL: number, targetCurrency: string, rates: Record<string, number>) => {
  const rate = rates[targetCurrency];
  if (!rate) {
    throw new Error(`Exchange rate for ${targetCurrency} not found`);
  }
  return (amountInBRL * rate).toFixed(2); // Convert and format to 2 decimal places
};