import { cn } from '@/lib/utils';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export function Heading({ level = 2, children, className }: HeadingProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Component 
      className={cn(
        'font-semibold tracking-tight',
        level === 1 && 'text-4xl lg:text-5xl',
        level === 2 && 'text-3xl lg:text-4xl',
        level === 3 && 'text-2xl lg:text-3xl',
        className
      )}
    >
      {children}
    </Component>
  );
} 