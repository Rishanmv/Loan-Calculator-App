import React from 'react';
import { Box, Typography, Grid, Paper, Divider } from '@mui/material';
import { LoanResults } from './Calculator';

interface ResultsProps {
  results: LoanResults;
  currency: string;
  exchangeRate: number | null;
}

export const Results: React.FC<ResultsProps> = ({ results, currency, exchangeRate }) => {
  const { monthlyPayment, totalPayment, totalInterest } = results;
  
  const formatCurrency = (amount: number): string => {
    const value = exchangeRate && currency !== 'INR'
      ? amount / exchangeRate
      : amount;
      
    const symbol = currency === 'INR' ? '₹' : currency === 'USD' ? '$' : '€';
    
    if (currency === 'INR') {
      return `${symbol}${value.toLocaleString('en-IN', {
        maximumFractionDigits: 0
      })}`;
    } else {
      return `${symbol}${value.toLocaleString('en-US', {
        maximumFractionDigits: 2
      })}`;
    }
  };

  const ResultCard = ({ title, amount, description, primary = false }: {
    title: string;
    amount: number;
    description: string;
    primary?: boolean;
  }) => (
    <Paper
      elevation={primary ? 3 : 1}
      sx={{
        p: 3,
        borderRadius: 2,
        height: '100%',
        backgroundColor: primary ? 'primary.light' : 'background.paper',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
        },
        '&::before': primary ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%)',
          zIndex: 1
        } : {}
      }}
    >
      <Typography 
        variant="subtitle2" 
        sx={{ 
          mb: 1,
          color: primary ? 'primary.contrastText' : 'text.secondary',
          fontWeight: 500
        }}
      >
        {title}
      </Typography>
      <Typography 
        variant="h5" 
        component="div" 
        sx={{ 
          fontWeight: 700,
          color: primary ? 'primary.contrastText' : 'text.primary',
          mb: 1
        }}
        className="fade-in"
      >
        {formatCurrency(amount)}
      </Typography>
      <Typography 
        variant="body2" 
        sx={{ 
          color: primary ? 'rgba(255,255,255,0.8)' : 'text.secondary',
          fontWeight: 400
        }}
      >
        {description}
      </Typography>
    </Paper>
  );

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Loan Summary
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <ResultCard
            title="Monthly EMI"
            amount={monthlyPayment}
            description="Your monthly loan payment"
            primary
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ResultCard
            title="Total Payment"
            amount={totalPayment}
            description="Principal + Interest"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ResultCard
            title="Total Interest"
            amount={totalInterest}
            description="Interest over loan term"
          />
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3, mb: 2 }}>
        <Divider />
      </Box>
    </Box>
  );
};