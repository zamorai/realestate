import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Calculator = 'mortgage' | 'rental';

interface CalculatorSelectorProps {
  onSelect: (calculator: Calculator) => void;
}

export function CalculatorSelector({ onSelect }: CalculatorSelectorProps) {
  return (
    <Tab.Group onChange={(index) => onSelect(index === 0 ? 'mortgage' : 'rental')}>
      <Tab.List className="relative flex w-fit rounded-full bg-background-element p-1 border border-border-color">
        {/* Background animation */}
        <motion.div
          className="absolute inset-y-1 rounded-full bg-background-container/80 z-0"
          layoutId="activeTab"
          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
          style={{
            width: 'calc(33.333333% - 0.25rem)',
          }}
        />
        
        {/* Tabs */}
        {['Mortgage Calculator', 'Rental Calculator'].map((tab, index) => (
          <Tab
            key={tab}
            className={({ selected }) =>
              cn(
                'relative px-4 py-1.5 text-sm font-medium rounded-full z-10',
                'focus:outline-none',
                'transition-colors duration-200',
                selected 
                  ? 'text-text-primary' 
                  : 'text-text-tertiary hover:text-text-secondary'
              )
            }
          >
            {tab}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
} 