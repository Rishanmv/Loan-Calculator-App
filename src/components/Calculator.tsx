import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import { LoanInput } from './LoanInput';
import { Results } from './Results';
import { BreakdownChart } from './BreakdownChart';
import { AmortizationTable } from './AmortizationTable';
import { CurrencyConverter } from './CurrencyConverter';
import { calculateLoan, generateAmortizationSchedule } from '../utils/calculations';

export interface LoanDetails {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
}

export interface LoanResults {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export const Calculator: React.FC = () => {
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    loanAmount: 1000000,
    interestRate: 10.5,
    loanTerm: 15,
  });

  const [results, setResults] = useState<LoanResults>({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
    amortizationSchedule: [],
  });

  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('INR');

  useEffect(() => {
    const { loanAmount, interestRate, loanTerm } = loanDetails;
    
    const { monthlyPayment, totalPayment, totalInterest } = calculateLoan(
      loanAmount,
      interestRate,
      loanTerm
    );
    
    const amortizationSchedule = generateAmortizationSchedule(
      loanAmount,
      interestRate,
      loanTerm,
      monthlyPayment
    );
    
    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      amortizationSchedule,
    });
  }, [loanDetails]);

  const handleLoanDetailsChange = (newDetails: Partial<LoanDetails>) => {
    setLoanDetails((prevDetails) => ({
      ...prevDetails,
      ...newDetails,
    }));
  };

  const handleCurrencyChange = (currency: string, rate: number | null) => {
    setSelectedCurrency(currency);
    setExchangeRate(rate);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              borderRadius: 3,
              height: '100%',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <LoanInput 
              loanDetails={loanDetails} 
              onLoanDetailsChange={handleLoanDetailsChange} 
            />
            <CurrencyConverter 
              onCurrencyChange={handleCurrencyChange}
            />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={7}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              borderRadius: 3,
              height: '100%',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <Results 
              results={results} 
              currency={selectedCurrency} 
              exchangeRate={exchangeRate} 
            />
            <BreakdownChart 
              principal={loanDetails.loanAmount} 
              interest={results.totalInterest} 
            />
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              borderRadius: 3,
              mt: 2,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <AmortizationTable 
              schedule={results.amortizationSchedule} 
              currency={selectedCurrency} 
              exchangeRate={exchangeRate} 
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};