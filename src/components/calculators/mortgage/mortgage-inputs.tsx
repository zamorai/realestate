import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RadioGroup } from '@headlessui/react';
import { mortgageCalculatorSchema, type MortgageCalculatorInputs } from '@/lib/schemas/mortgage-calculator';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface MortgageInputsProps {
  onCalculate: (values: MortgageCalculatorInputs) => void;
}

export function MortgageInputs({ onCalculate }: MortgageInputsProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MortgageCalculatorInputs>({
    resolver: yupResolver(mortgageCalculatorSchema),
    defaultValues: {
      homePrice: 500000,
      downPaymentType: 'percentage',
      downPayment: 20,
      loanTerm: 30,
      interestRate: 7,
      commonCharges: null,
      taxes: null,
    },
  });

  const downPaymentType = watch('downPaymentType');
  const homePrice = watch('homePrice');

  const handleDownPaymentTypeChange = (type: 'percentage' | 'amount') => {
    const currentDownPayment = watch('downPayment');
    setValue('downPaymentType', type);
    
    if (type === 'percentage' && currentDownPayment > 100) {
      setValue('downPayment', (currentDownPayment / homePrice) * 100);
    } else if (type === 'amount' && currentDownPayment <= 100) {
      setValue('downPayment', (currentDownPayment / 100) * homePrice);
    }
  };

  const onSubmit = handleSubmit((data) => {
    // Convert percentage to amount if needed
    if (data.downPaymentType === 'percentage') {
      data.downPayment = (data.downPayment / 100) * data.homePrice;
    }
    onCalculate(data);
  });

  // Helper function to format numbers with commas
  const formatNumber = (value: number | null): string => {
    if (value === null) return '';
    return value.toLocaleString('en-US');
  };

  // Helper function to parse string back to number
  const parseNumber = (value: string): number => {
    return parseFloat(value.replace(/,/g, '')) || 0;
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Input
        label="Home Price"
        type="text"
        prefix="$"
        aria-description="Enter the total price of the home"
        value={formatNumber(watch('homePrice'))}
        onChange={(e) => setValue('homePrice', parseNumber(e.target.value))}
        error={errors.homePrice?.message}
      />

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-text-primary">
          Down Payment
        </label>
        <p className="text-sm text-text-tertiary">
          Choose percentage or amount
        </p>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input
              type="text"
              prefix={downPaymentType === 'amount' ? '$' : undefined}
              suffix={downPaymentType === 'percentage' ? '%' : undefined}
              value={formatNumber(watch('downPayment'))}
              onChange={(e) => setValue('downPayment', parseNumber(e.target.value))}
              error={errors.downPayment?.message}
            />
          </div>
          <div className="relative inline-flex rounded-full bg-background-element border border-border-color p-1">
            <motion.div
              className="absolute inset-y-1 rounded-full bg-background-container/80"
              layoutId="activeDownPaymentType"
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              style={{
                width: '50%',
                left: downPaymentType === 'percentage' ? '0%' : '50%'
              }}
            />

            <button
              type="button"
              onClick={() => handleDownPaymentTypeChange('percentage')}
              className={cn(
                'relative z-10 pl-4 pr-2 py-1.5',
                'text-sm font-medium rounded-full',
                'transition-colors duration-200',
                'focus:outline-none',
                downPaymentType === 'percentage'
                  ? 'text-text-primary'
                  : 'text-text-tertiary hover:text-text-secondary'
              )}
            >
              %
            </button>

            <button
              type="button"
              onClick={() => handleDownPaymentTypeChange('amount')}
              className={cn(
                'relative z-10 pr-4 pl-2 py-1.5',
                'text-sm font-medium rounded-full',
                'transition-colors duration-200',
                'focus:outline-none',
                downPaymentType === 'amount'
                  ? 'text-text-primary'
                  : 'text-text-tertiary hover:text-text-secondary'
              )}
            >
              $
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-text-primary">
          Loan Term (Years)
        </label>
        <RadioGroup
          value={watch('loanTerm')}
          onChange={(value) => setValue('loanTerm', value)}
        >
          <div className="relative flex w-full rounded-full bg-background-element p-1 border border-border-color">
            {/* Animated background for selected state */}
            <motion.div
              className="absolute inset-y-1 rounded-full bg-background-container/80"
              layoutId="activeLoanTerm"
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              style={{
                width: '25%',
                left: `${(['10', '15', '20', '30'].indexOf(watch('loanTerm').toString()) * 25)}%`
              }}
            />
            
            {/* Radio options */}
            {[10, 15, 20, 30].map((term) => (
              <RadioGroup.Option
                key={term}
                value={term}
                className={({ checked }) => cn(
                  'relative z-10 flex-1 px-3 py-1.5',
                  'text-sm font-medium text-center rounded-full',
                  'transition-colors duration-200',
                  'focus:outline-none cursor-pointer',
                  checked 
                    ? 'text-text-primary' 
                    : 'text-text-tertiary hover:text-text-secondary'
                )}
              >
                {term}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>

      <Input
        label="Interest Rate"
        type="text"
        suffix="%"
        step="0.1"
        {...register('interestRate')}
        error={errors.interestRate?.message}
      />

      <Input
        label="Common Charges (Optional)"
        type="text"
        prefix="$"
        value={formatNumber(watch('commonCharges')) ?? ''}
        onChange={(e) => setValue('commonCharges', parseNumber(e.target.value) || null)}
        error={errors.commonCharges?.message}
      />

      <Input
        label="Property Taxes (Optional)"
        type="text"
        prefix="$"
        value={formatNumber(watch('taxes')) ?? ''}
        onChange={(e) => setValue('taxes', parseNumber(e.target.value) || null)}
        error={errors.taxes?.message}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Calculate
      </button>
    </form>
  );
} 