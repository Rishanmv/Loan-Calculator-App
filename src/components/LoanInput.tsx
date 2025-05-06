import React from 'react';
import { 
  Box, 
  Typography, 
  Slider, 
  TextField, 
  InputAdornment,
  Divider
} from '@mui/material';
import { LoanDetails } from './Calculator';

interface LoanInputProps {
  loanDetails: LoanDetails;
  onLoanDetailsChange: (details: Partial<LoanDetails>) => void;
}

export const LoanInput: React.FC<LoanInputProps> = ({ 
  loanDetails, 
  onLoanDetailsChange 
}) => {
  const { loanAmount, interestRate, loanTerm } = loanDetails;

  const handleLoanAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value) || 0;
    onLoanDetailsChange({ loanAmount: newValue });
  };

  const handleLoanAmountSliderChange = (_event: Event, newValue: number | number[]) => {
    onLoanDetailsChange({ loanAmount: newValue as number });
  };

  const handleInterestRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value) || 0;
    onLoanDetailsChange({ interestRate: newValue });
  };

  const handleInterestRateSliderChange = (_event: Event, newValue: number | number[]) => {
    onLoanDetailsChange({ interestRate: newValue as number });
  };

  const handleLoanTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value) || 0;
    onLoanDetailsChange({ loanTerm: newValue });
  };

  const handleLoanTermSliderChange = (_event: Event, newValue: number | number[]) => {
    onLoanDetailsChange({ loanTerm: newValue as number });
  };

  const formatRupees = (value: number) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Loan Details
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            Loan Amount
          </Typography>
          <TextField
            value={loanAmount}
            onChange={handleLoanAmountChange}
            type="number"
            size="small"
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              className: 'number-input',
            }}
            sx={{ width: '140px' }}
          />
        </Box>
        <Slider
          value={loanAmount}
          onChange={handleLoanAmountSliderChange}
          min={100000}
          max={10000000}
          step={10000}
          valueLabelDisplay="auto"
          valueLabelFormat={formatRupees}
          color="primary"
          sx={{ mt: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="caption" color="text.secondary">₹1 Lakh</Typography>
          <Typography variant="caption" color="text.secondary">₹1 Crore</Typography>
        </Box>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            Interest Rate
          </Typography>
          <TextField
            value={interestRate}
            onChange={handleInterestRateChange}
            type="number"
            size="small"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
              className: 'number-input',
            }}
            sx={{ width: '100px' }}
          />
        </Box>
        <Slider
          value={interestRate}
          onChange={handleInterestRateSliderChange}
          min={5}
          max={20}
          step={0.1}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value}%`}
          color="secondary"
          sx={{ mt: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="caption" color="text.secondary">5%</Typography>
          <Typography variant="caption" color="text.secondary">20%</Typography>
        </Box>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            Loan Term
          </Typography>
          <TextField
            value={loanTerm}
            onChange={handleLoanTermChange}
            type="number"
            size="small"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">Yr</InputAdornment>,
              className: 'number-input',
            }}
            sx={{ width: '80px' }}
          />
        </Box>
        <Slider
          value={loanTerm}
          onChange={handleLoanTermSliderChange}
          min={1}
          max={30}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value} Years`}
          color="primary"
          sx={{ mt: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="caption" color="text.secondary">1 Year</Typography>
          <Typography variant="caption" color="text.secondary">30 Years</Typography>
        </Box>
      </Box>
    </Box>
  );
};