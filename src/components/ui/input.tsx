import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  prefix?: string;
  suffix?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, prefix, suffix, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <div className="space-y-0.5">
            <label className="block text-sm font-medium text-text-primary">
              {label}
            </label>
            {props['aria-description'] && (
              <p className="text-sm text-text-tertiary">
                {props['aria-description']}
              </p>
            )}
          </div>
        )}
        <div className="relative">
          {prefix && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <span className="text-text-secondary text-sm">{prefix}</span>
            </div>
          )}
          <input
            className={cn(
              'block w-full px-3 py-2.5 rounded-md',
              'bg-background-element border border-border-color',
              'text-sm text-text-primary',
              'placeholder:text-text-tertiary',
              'transition-all duration-200',
              'focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary',
              'hover:border-opacity-50',
              prefix && 'pl-7',
              suffix && 'pr-7',
              error && 'border-accent-error focus:ring-accent-error focus:border-accent-error',
              className
            )}
            ref={ref}
            {...props}
          />
          {suffix && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">{suffix}</span>
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input'; 