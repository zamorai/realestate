interface CalculatorLayoutProps {
  inputs: React.ReactNode;
  results: React.ReactNode;
}

export function CalculatorLayout({ inputs, results }: CalculatorLayoutProps) {
  return (
    <div className="mt-6 rounded-xl border border-border-color bg-background-container p-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4">
          <div className="rounded-lg border border-border-color bg-background-element p-6">
            {inputs}
          </div>
        </div>
        <div className="lg:col-span-8">
          <div className="rounded-lg border border-border-color bg-background-element p-6">
            {results}
          </div>
        </div>
      </div>
    </div>
  );
} 