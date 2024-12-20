import { MortgageCalculation } from '@/lib/calculators/mortgage';

interface MortgageResultsProps {
  calculation: MortgageCalculation | null;
}

export function MortgageResults({ calculation }: MortgageResultsProps) {
  if (!calculation) {
    return (
      <div className="text-center text-gray-500">
        Enter your mortgage details to see the calculation
      </div>
    );
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Monthly Payment</h3>
          <p className="mt-2 text-3xl font-semibold text-blue-600">
            {formatCurrency(calculation.monthlyPayment)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Total Cost</h3>
          <p className="mt-2 text-3xl font-semibold text-blue-600">
            {formatCurrency(calculation.totalPayment)}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Principal & Interest</span>
            <span className="font-medium">{formatCurrency(calculation.monthlyMortgage)}</span>
          </div>
          {calculation.commonCharges > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Common Charges</span>
              <span className="font-medium">{formatCurrency(calculation.commonCharges)}</span>
            </div>
          )}
          {calculation.taxes > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Property Taxes</span>
              <span className="font-medium">{formatCurrency(calculation.taxes)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 