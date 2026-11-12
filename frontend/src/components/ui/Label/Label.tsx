import type { LabelHTMLAttributes } from 'react';
import clsx from 'clsx';

// Types
type LabelAppearance = 'default' | 'prominent';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
	appearance?: LabelAppearance;
	bordered?: boolean;
	required?: boolean;
}

// Styles
const baseStyles = clsx(
	'inline-flex w-fit items-center gap-1',
	'rounded-sm text-sm font-medium',
);

const appearanceStyles: Record<LabelAppearance, string> = {
	default: 'text-muted',
	prominent: 'text-primary',
};

// Component
export function Label({
	appearance = 'default',
	bordered = false,
	required = false,
	htmlFor,
	className,
	children,
	...rest
}: LabelProps) {
	return (
		<label
			{...rest}
			htmlFor={htmlFor}
			className={clsx(
				baseStyles,
				appearanceStyles[appearance],
				bordered && 'border border-current px-2 py-1',
				htmlFor && 'cursor-pointer',
				className,
			)}
		>
			{children}

			{required && (
				<span className="text-danger" aria-hidden="true">
					*
				</span>
			)}
		</label>
	);
}
