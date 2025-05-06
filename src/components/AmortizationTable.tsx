import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  useTheme,
  useMediaQuery
} from '@mui/material';

interface AmortizationTableProps {
  schedule: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
  currency: string;
  exchangeRate: number | null;
}

export const AmortizationTable: React.FC<AmortizationTableProps> = ({
  schedule,
  currency,
  exchangeRate
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  if (schedule.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Amortization Schedule
      </Typography>
      
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table size={isMobile ? 'small' : 'medium'}>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.light' }}>
              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 600 }}>Month</TableCell>
              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 600 }}>Payment</TableCell>
              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 600 }}>Principal</TableCell>
              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 600 }}>Interest</TableCell>
              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 600 }}>Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow 
                  key={row.month} 
                  sx={{ 
                    '&:nth-of-type(odd)': { 
                      backgroundColor: 'background.default' 
                    },
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    }
                  }}
                >
                  <TableCell>{row.month}</TableCell>
                  <TableCell>{formatCurrency(row.payment)}</TableCell>
                  <TableCell>{formatCurrency(row.principal)}</TableCell>
                  <TableCell>{formatCurrency(row.interest)}</TableCell>
                  <TableCell>{formatCurrency(row.balance)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={schedule.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};