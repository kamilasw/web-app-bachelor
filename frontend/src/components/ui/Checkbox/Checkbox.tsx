import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';
import clsx from 'clsx';

import { Label } from '../Label/Label';

// Types
interface CheckboxProps extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'type' | 'size'
> {
	label: string;
}

// Styles
const checkboxStyles = clsx(
	'pointer-events-none absolute inset-0',
	'rounded-sm border-2 border-border-default bg-surface',
	'peer-checked:border-primary peer-checked:bg-primary',
	'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2',
	'peer-focus-visible:outline-primary',
	'peer-disabled:opacity-50',
	'peer-enabled:peer-hover:border-primary-hover',
);

// Component
export function Checkbox({
	label,
	id,
	disabled = false,
	className,
	...rest
}: CheckboxProps) {
	const generatedId = useId();
	const checkboxId = id ?? generatedId;

	return (
		<div className={clsx('inline-flex items-center gap-2 text-sm', className)}>
			<span className="relative size-4 shrink-0">
				<input
					{...rest}
					id={checkboxId}
					type="checkbox"
					disabled={disabled}
					className={clsx(
						'peer absolute inset-0 m-0 size-full opacity-0',
						'cursor-pointer disabled:cursor-not-allowed',
					)}
				/>

				<span aria-hidden="true" className={checkboxStyles} />

				<Check
					className={clsx(
						'pointer-events-none absolute inset-0 m-auto',
						'size-[1em] text-white opacity-0',
						'peer-checked:opacity-100',
						'peer-disabled:opacity-50',
					)}
					aria-hidden="true"
				/>
			</span>

			<Label
				htmlFor={checkboxId}
				className={clsx(disabled && 'opacity-50 cursor-not-allowed!')}
			>
				{label}
			</Label>
		</div>
	);
}
