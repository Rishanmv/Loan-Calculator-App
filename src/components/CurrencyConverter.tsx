import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  CircularProgress,
  SelectChangeEvent
} from '@mui/material';
import { fetchExchangeRates } from '../utils/api';

interface CurrencyConverterProps {
  onCurrencyChange: (currency: string, rate: number | null) => void;
}

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ onCurrencyChange }) => {
  const [currency, setCurrency] = useState<string>('INR');
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRates = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchExchangeRates();
        setRates(data.conversion_rates);
      } catch (err) {
        setError('Failed to fetch exchange rates');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    getRates();
  }, []);

  useEffect(() => {
    if (rates) {
      // For INR, we pass null as the rate since it's the base currency
      onCurrencyChange(currency, currency === 'INR' ? null : rates[currency]);
    }
  }, [currency, rates, onCurrencyChange]);

  const handleCurrencyChange = (event: SelectChangeEvent<string>) => {
    setCurrency(event.target.value);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Divider sx={{ my: 3 }} />
      
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
        Currency Conversion
      </Typography>
      
      <Box sx={{ mt: 2 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress size={24} />
          </Box>
        ) : error ? (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        ) : (
          <FormControl fullWidth size="small">
            <InputLabel id="currency-select-label">Currency</InputLabel>
            <Select
              labelId="currency-select-label"
              id="currency-select"
              value={currency}
              label="Currency"
              onChange={handleCurrencyChange}
            >
              <MenuItem value="INR">Indian Rupee (₹)</MenuItem>
              <MenuItem value="USD">US Dollar ($)</MenuItem>
              <MenuItem value="EUR">Euro (€)</MenuItem>
              <MenuItem value="GBP">British Pound (£)</MenuItem>
              <MenuItem value="AUD">Australian Dollar (A$)</MenuItem>
              <MenuItem value="CAD">Canadian Dollar (C$)</MenuItem>
              <MenuItem value="SGD">Singapore Dollar (S$)</MenuItem>
              <MenuItem value="JPY">Japanese Yen (¥)</MenuItem>
            </Select>
          </FormControl>
        )}
        
        {rates && currency !== 'INR' && (
          <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
            1 {currency} = ₹{rates ? (1 / rates[currency] * rates['INR']).toFixed(2) : ''}
          </Typography>
        )}
      </Box>
    </Box>
  );
};