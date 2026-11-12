import type { HTMLAttributes } from 'react';
import clsx from 'clsx';

// Types
type BadgeAppearance =
	| 'default'
	| 'information'
	| 'success'
	| 'warning'
	| 'danger'
	| 'discovery';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	appearance?: BadgeAppearance;
}

// Styles
const baseStyles = clsx(
	'inline-flex w-fit max-w-full items-center',
	'rounded-sm px-2 py-0.5',
	'text-xs leading-4 font-semibold',
	'whitespace-nowrap',
);

const appearanceStyles: Record<BadgeAppearance, string> = {
	default: 'bg-neutral-hover text-muted',
	information: 'bg-primary/10 text-primary',
	success: 'bg-success/10 text-success',
	warning: 'bg-warning/10 text-warning',
	danger: 'bg-danger/10 text-danger',
	discovery: 'bg-discovery/10 text-discovery',
};

// Component
export function Badge({
	appearance = 'default',
	className,
	children,
	...rest
}: BadgeProps) {
	return (
		<span
			{...rest}
			className={clsx(baseStyles, appearanceStyles[appearance], className)}
		>
			{children}
		</span>
	);
}
