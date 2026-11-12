import type { ButtonHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

// Types
type ButtonAppearance =
	| 'primary'
	| 'default'
	| 'subtle'
	| 'danger'
	| 'discovery';
type ButtonSize = 'sm' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	appearance?: ButtonAppearance;
	size?: ButtonSize;
	compact?: boolean;
	icon?: LucideIcon;
	loading?: boolean;
}

// Styles
const baseStyles = clsx(
  'inline-flex items-center justify-center gap-2',
  'whitespace-nowrap rounded-sm font-medium',
  'cursor-pointer',
  'focus-visible:outline-2 focus-visible:outline-offset-2',
  'focus-visible:outline-primary',
  'disabled:cursor-not-allowed disabled:opacity-50'
);

const appearanceStyles: Record<ButtonAppearance, string> = {
  primary: clsx(
    'bg-primary text-white',
    'enabled:hover:bg-primary-hover',
    'enabled:active:bg-primary-pressed'
  ),

  default: clsx(
    'bg-surface text-foreground',
    'enabled:hover:bg-neutral-hover',
    'enabled:active:bg-neutral-pressed'
  ),

  subtle: clsx(
    'bg-transparent text-foreground',
    'enabled:hover:bg-neutral-hover',
    'enabled:active:bg-neutral-pressed'
  ),

  danger: clsx(
    'bg-danger text-white',
    'enabled:hover:bg-danger-hover',
    'enabled:active:bg-danger-pressed'
  ),

  discovery: clsx(
    'bg-discovery text-white',
    'enabled:hover:bg-discovery-hover',
    'enabled:active:bg-discovery-pressed'
  ),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 text-sm',
  lg: 'h-10 text-base',
};

// component
export function Button({
  appearance = 'default',
  size = 'lg',
  compact = false,
  icon: Icon,
  loading = false,
  disabled = false,
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading}
      className={clsx(
        baseStyles,
        appearanceStyles[appearance],
        sizeStyles[size],
        compact ? 'px-2' : 'px-4',
        className
      )}
    >
      {loading ? (
        'Loading...' // todo: loading animation
      ) : (
        <>
          {Icon && (
            <Icon
              className="size-[1.25em] shrink-0"
              aria-hidden="true"
            />
          )}
          {children}
        </>
      )}
    </button>
  );
}
