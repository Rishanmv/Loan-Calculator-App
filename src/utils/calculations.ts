export const calculateLoan = (
  loanAmount: number,
  interestRate: number,
  loanTerm: number
): {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
} => {
  // Convert annual interest rate to monthly rate
  const monthlyRate = interestRate / 100 / 12;
  
  // Convert loan term from years to months
  const numberOfPayments = loanTerm * 12;
  
  // Calculate monthly payment using the formula:
  // P = (Pv * r * (1 + r)^n) / ((1 + r)^n - 1)
  // Where:
  // P = Monthly payment
  // Pv = Loan amount
  // r = Monthly interest rate (annual rate / 12)
  // n = Number of payments (loan term in years * 12)
  
  const monthlyPayment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  // Calculate total payment over the life of the loan
  const totalPayment = monthlyPayment * numberOfPayments;
  
  // Calculate total interest paid over the life of the loan
  const totalInterest = totalPayment - loanAmount;
  
  return {
    monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment,
    totalPayment: isNaN(totalPayment) ? 0 : totalPayment,
    totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
  };
};

export const generateAmortizationSchedule = (
  loanAmount: number,
  interestRate: number,
  loanTerm: number,
  monthlyPayment: number
): Array<{
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}> => {
  const schedule = [];
  let balance = loanAmount;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfMonths = loanTerm * 12;
  
  for (let month = 1; month <= numberOfMonths; month++) {
    // Calculate interest for the current month
    const interestPayment = balance * monthlyRate;
    
    // Calculate principal payment for the current month
    let principalPayment = monthlyPayment - interestPayment;
    
    // Adjust the final payment if needed to ensure the loan is fully paid off
    if (balance < monthlyPayment) {
      principalPayment = balance;
      monthlyPayment = balance + interestPayment;
    }
    
    // Update the remaining balance
    balance -= principalPayment;
    
    // Add the payment details to the schedule
    schedule.push({
      month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance: balance < 0.01 ? 0 : balance, // Ensure balance is exactly 0 at the end
    });
    
    // If the balance is fully paid off, exit the loop
    if (balance <= 0) {
      break;
    }
  }
  
  return schedule;
};