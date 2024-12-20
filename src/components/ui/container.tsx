import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function Container({ children, className, fullWidth = false }: ContainerProps) {
  return (
    <div className={cn(
      'w-full px-4 sm:px-6 mx-auto',
      !fullWidth && 'max-w-5xl',
      className
    )}>
      {children}
    </div>
  );
} 