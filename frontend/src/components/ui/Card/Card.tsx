
import type { HTMLAttributes } from 'react';
import clsx from 'clsx';

// Types
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
  compact?: boolean;
  shadow?: boolean;
}

// Styles
const baseStyles = clsx(
  'rounded-lg bg-surface text-foreground'
);

// Component
export function Card({
  bordered = true,
  compact = false,
  shadow = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      {...rest}
      className={clsx(
        baseStyles,
        bordered && 'border border-border-default',
        compact ? 'p-3' : 'p-6',
        shadow && 'shadow-md',
        className
      )}
    >
      {children}
    </div>
  );
}
