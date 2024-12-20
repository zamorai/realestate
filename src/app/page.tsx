'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Heading } from '@/components/ui/heading';
import { Container } from '@/components/ui/container';
import { CalculatorSelector } from '@/components/calculators/calculator-selector';
import { CalculatorLayout } from '@/components/calculators/calculator-layout';
import { AnimatedPanel } from '@/components/calculators/animated-panel';
import { MortgageInputs } from '@/components/calculators/mortgage/mortgage-inputs';
import { MortgageResults } from '@/components/calculators/mortgage/mortgage-results';
import { calculateMortgage } from '@/lib/calculators/mortgage';
import type { MortgageCalculation } from '@/lib/calculators/mortgage';
import type { MortgageCalculatorInputs } from '@/lib/schemas/mortgage-calculator';

export default function Home() {
  const [calculator, setCalculator] = useState<'mortgage' | 'rental'>('mortgage');
  const [mortgageCalculation, setMortgageCalculation] = useState<MortgageCalculation | null>(null);

  const handleMortgageCalculate = (values: MortgageCalculatorInputs) => {
    const result = calculateMortgage(
      values.homePrice,
      values.downPayment,
      values.loanTerm,
      values.interestRate,
      values.commonCharges,
      values.taxes
    );
    setMortgageCalculation(result);
  };

  return (
    <main className="py-8">
      <Container>
        <Heading level={2}>Real Estate Calculators</Heading>
        
        <div className="mt-6">
          <CalculatorSelector onSelect={setCalculator} />
        </div>

        <AnimatePresence mode="wait">
          {calculator === 'mortgage' ? (
            <AnimatedPanel key="mortgage">
              <CalculatorLayout
                inputs={<MortgageInputs onCalculate={handleMortgageCalculate} />}
                results={<MortgageResults calculation={mortgageCalculation} />}
              />
            </AnimatedPanel>
          ) : (
            <AnimatedPanel key="rental">
              <CalculatorLayout
                inputs={<div>Rental inputs coming soon...</div>}
                results={<div>Rental results coming soon...</div>}
              />
            </AnimatedPanel>
          )}
        </AnimatePresence>
      </Container>
    </main>
  );
}
