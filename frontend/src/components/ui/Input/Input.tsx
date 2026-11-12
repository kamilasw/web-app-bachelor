import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { CircleAlert } from 'lucide-react';
import clsx from 'clsx';

import { Label } from '../Label/Label';

// Types
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	hint?: string;
	error?: string;
	compact?: boolean;
}

// Styles
const baseStyles = clsx(
	'w-full rounded-sm border bg-surface px-3',
	'text-foreground placeholder:text-muted',
	'focus-visible:outline-2 focus-visible:outline-offset-1',
	'disabled:cursor-not-allowed disabled:opacity-50',
);

// Component
export function Input({
	label,
	hint,
	error,
	compact = false,
	id,
	type = 'text',
	className,
	required,
	disabled,
	'aria-describedby': ariaDescribedBy,
	'aria-invalid': ariaInvalid,
	...rest
}: InputProps) {
	const generatedId = useId();
	const inputId = id ?? generatedId;

	const hintId = `${inputId}-hint`;
	const errorId = `${inputId}-error`;

	const describedBy =
		clsx(ariaDescribedBy, hint && hintId, error && errorId) || undefined;

	return (
		<div className="flex w-full flex-col gap-1">
			<Label
				htmlFor={inputId}
				required={required}
				className={clsx(disabled && 'opacity-50 cursor-not-allowed!')}
			>
				{label}
			</Label>

			<input
				{...rest}
				id={inputId}
				type={type}
				required={required}
				disabled={disabled}
				aria-invalid={error ? true : ariaInvalid}
				aria-describedby={describedBy}
				className={clsx(
					baseStyles,
					compact ? 'h-8 text-sm' : 'h-10 text-base',
					error
						? 'border-danger focus-visible:outline-danger'
						: 'border-border-default focus-visible:outline-primary',
					className,
				)}
			/>

			{hint && (
				<p id={hintId} className="text-xs text-muted">
					{hint}
				</p>
			)}

			{error && (
				<p id={errorId} className="flex items-center gap-1 text-xs text-danger">
					<CircleAlert className="size-[1.25em] shrink-0" aria-hidden="true" />
					{error}
				</p>
			)}
		</div>
	);
}
