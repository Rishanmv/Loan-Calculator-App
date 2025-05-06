import axios from 'axios';

const API_KEY = 'a64e528a80cb3b3550d48f8c';
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

interface ExchangeRateResponse {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates: Record<string, number>;
}

export const fetchExchangeRates = async (): Promise<ExchangeRateResponse> => {
  try {
    const response = await axios.get<ExchangeRateResponse>(
      `${BASE_URL}/${API_KEY}/latest/INR`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw new Error('Failed to fetch exchange rates');
  }
};