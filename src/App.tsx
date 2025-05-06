import React from 'react';
import { Container, Box, Typography, Link, Grid } from '@mui/material';
import { Calculator } from './components/Calculator';
import { IndianRupee } from 'lucide-react';

function App() {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        bgcolor: 'background.default' 
      }}
    >
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Box 
          component="header" 
          sx={{ 
            mb: 4, 
            textAlign: { xs: 'center', md: 'left' }, 
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'space-between' }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, md: 0 } }}>
            <IndianRupee size={36} color="#3f51b5" strokeWidth={2} />
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                ml: 1, 
                fontWeight: 700, 
                color: 'primary.main',
                fontSize: { xs: '1.75rem', md: '2rem' } 
              }}
            >
              Loan Calculator
            </Typography>
          </Box>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: { xs: '100%', md: '50%' },
              textAlign: { xs: 'center', md: 'right' }
            }}
          >
            Plan your loans with accurate EMI calculations in Indian Rupees
          </Typography>
        </Box>
        
        <Calculator />
        
        <Grid container spacing={2} sx={{ mt: 6 }}>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} Loan Calculator India | Currency data provided by{' '}
              <Link href="https://www.exchangerate-api.com" target="_blank" rel="noopener" color="primary">
                ExchangeRate-API
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;