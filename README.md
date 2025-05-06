# Loan Calculator App



This is a modern, single-page web application built using React JS and Material UI to help users calculate loan EMIs (Equated Monthly Installments), view a detailed amortization schedule, and see real-time currency conversions of their EMI using live exchange rates.

## Live Demo

[**Visit the Live Demo**]  (https://rishans-loan-calculator-app.netlify.app/)


## Features

* **Loan EMI Calculation:** Calculates the EMI based on the principal loan amount, annual interest rate, and loan tenure.
* **Dynamic Amortization Schedule:** Provides a detailed monthly breakdown of loan payments, including principal and interest components and the remaining balance.
* **Real-time Currency Conversion:** Converts the calculated EMI to other currencies using live exchange rates fetched from the ExchangeRate-API.
* **Paginated Exchange Rate Table:** Displays a table of live exchange rates for a wide range of currencies, with pagination for easy browsing.
* **Dark/Light Mode Toggle:** Offers a customizable user experience with both light and dark theme options.
* **Responsive UI:** Fully responsive design built with Material UI, ensuring a seamless experience across various screen sizes.
* **Collapsible Mobile Navigation:** Provides a clean and efficient navigation experience on mobile devices.
* **404 Not Found Page:** Displays a custom 404 page for any unmatched routes.
* **Graceful Error Handling:** Implements an error boundary to catch runtime errors and display a user-friendly error message.

## Technologies Used

* **React JS:** A JavaScript library for building user interfaces.
    * **Hooks:** For managing state and side effects in functional components.
    * **Routing (React Router):** For navigation between different sections of the application.
    * **Context API:** For global state management (theme and currency).
* **Material UI:** A popular React UI framework providing pre-built, responsive components styled with Google's Material Design.
* **Axios:** A promise-based HTTP client for making API requests.
* **ExchangeRate-API:** A free API for fetching live currency exchange rates.

## EMI Formula

## The EMI (Equated Monthly Installment) is calculated using the following standard formula:

EMI Formula Used
The EMI (Equated Monthly Installment) is calculated using the standard formula:
EMI = [P * R× (1+R)N] / I(1+R)N -
1]
Where:
﻿﻿P = Principal loan amount
﻿﻿R = Monthly interest rate (annual rate / 12 / 100)
﻿﻿N = Loan duration in months


  
## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Rishanmc/Loan-Calculator-App.git
```

2. Install dependencies:
```bash
cd Loan-Calculator-App
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Features in Detail

### Loan Calculator
- Input loan amount (₹1 Lakh to ₹1 Crore)
- Adjust interest rate (5% to 20%)
- Set loan term (1 to 30 years)
- Real-time EMI calculation

### Currency Conversion
- Convert between INR and major currencies (USD, EUR, GBP, etc.)
- Real-time exchange rates via ExchangeRate-API
- Automatic rate updates

### Visualization
- Interactive doughnut chart for payment breakdown
- Detailed amortization table with pagination
- Responsive design for all screen sizes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Exchange rates provided by [ExchangeRate-API](https://www.exchangerate-api.com)
- Icons by [Lucide React](https://lucide.dev)
- UI Components by [Material-UI](https://mui.com)
