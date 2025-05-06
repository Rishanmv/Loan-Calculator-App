import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface BreakdownChartProps {
  principal: number;
  interest: number;
}

export const BreakdownChart: React.FC<BreakdownChartProps> = ({ principal, interest }) => {
  const theme = useTheme();

  const data = {
    labels: ['Principal', 'Interest'],
    datasets: [
      {
        data: [principal, interest],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
        ],
        borderColor: [
          theme.palette.primary.dark,
          theme.palette.secondary.dark,
        ],
        borderWidth: 1,
        hoverOffset: 6,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1000,
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            family: theme.typography.fontFamily,
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw as number;
            const total = principal + interest;
            const percentage = ((value / total) * 100).toFixed(1);
            
            return `${context.label}: ₹${value.toLocaleString('en-IN')} (${percentage}%)`;
          },
        },
        titleFont: {
          family: theme.typography.fontFamily,
          size: 14,
        },
        bodyFont: {
          family: theme.typography.fontFamily,
          size: 13,
        },
        padding: 12,
        boxPadding: 6,
      },
    },
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography 
        variant="h6" 
        component="h3" 
        sx={{ 
          mb: 2,
          fontWeight: 500, 
          textAlign: 'center',
          color: 'text.primary'
        }}
      >
        Payment Breakdown
      </Typography>
      <Box 
        sx={{ 
          height: 240, 
          position: 'relative',
          mx: 'auto',
          maxWidth: 400,
        }}
        className="slide-up"
      >
        <Doughnut data={data} options={options} />
      </Box>
    </Box>
  );
};