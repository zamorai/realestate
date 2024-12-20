export interface MortgageCalculation {
  monthlyMortgage: number;
  monthlyPayment: number;
  totalPayment: number;
  principalAmount: number;
  downPayment: number;
  commonCharges: number;
  taxes: number;
}

export function calculateMortgage(
  homePrice: number,
  downPayment: number,
  loanTerm: number,
  interestRate: number,
  commonCharges: number | null,
  taxes: number | null
): MortgageCalculation {
  const principalAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  const monthlyMortgage =
    (principalAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const monthlyCommonCharges = commonCharges || 0;
  const monthlyTaxes = taxes ? taxes / 12 : 0;

  const monthlyPayment = monthlyMortgage + monthlyCommonCharges + monthlyTaxes;
  const totalPayment = monthlyPayment * numberOfPayments;

  return {
    monthlyMortgage,
    monthlyPayment,
    totalPayment,
    principalAmount,
    downPayment,
    commonCharges: monthlyCommonCharges,
    taxes: monthlyTaxes,
  };
} 