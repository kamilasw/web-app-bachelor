import { useId } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { ChevronDown, CircleAlert } from 'lucide-react';
import clsx from 'clsx';

import { Label } from '../Label/Label';

// Types
interface SelectOption {
	value: string;
	label: string;
	disabled?: boolean;
}

interface SelectProps extends Omit<
	SelectHTMLAttributes<HTMLSelectElement>,
	'size' | 'multiple' | 'children'
> {
	label: string;
	options: SelectOption[];
	placeholder?: string;
	hint?: string;
	error?: string;
	compact?: boolean;
}

const baseStyles = clsx(
	'w-full rounded-sm border bg-surface',
	'px-3 py-0 pr-10 text-foreground',
	'cursor-pointer',
	'focus-visible:outline-2 focus-visible:outline-offset-1',
	'disabled:cursor-not-allowed disabled:opacity-50',

	'[@supports(appearance:base-select)]:[appearance:base-select]',
	'[@supports(appearance:base-select)]:flex',
	'[@supports(appearance:base-select)]:items-center',
	'[&::picker-icon]:hidden',
);

const dropdownStyles = clsx(
	'[&::picker(select)]:[appearance:base-select]',
	'[&::picker(select)]:mt-1',
	'[&::picker(select)]:rounded-sm',
	'[&::picker(select)]:border',
	'[&::picker(select)]:border-border-default',
	'[&::picker(select)]:bg-surface',
	'[&::picker(select)]:p-1',
	'[&::picker(select)]:shadow-lg',
	'[&::picker(select)]:max-h-60',
	'[&::picker(select)]:overflow-auto',
);

const optionStyles = clsx(
	'[&_option]:rounded-sm',
	'[&_option]:px-3',
	'[&_option]:py-2',
	'[&_option]:text-foreground',
	'[&_option]:cursor-pointer',

	'[&_option:enabled:hover]:bg-neutral-hover',
	'[&_option:enabled:focus-visible]:outline-2',
	'[&_option:enabled:focus-visible]:outline-primary',
	'[&_option:enabled:active]:bg-neutral-pressed',

	'[&_option:enabled:checked]:bg-neutral-hover',
	'[&_option:enabled:checked]:text-primary',

	'[&_option:disabled]:text-muted',
	'[&_option:disabled]:cursor-not-allowed',
);

// Component
export function Select({
	label,
	options,
	placeholder,
	hint,
	error,
	compact = false,
	id,
	disabled = false,
	required = false,
	className,
	'aria-describedby': ariaDescribedBy,
	'aria-invalid': ariaInvalid,
	...rest
}: SelectProps) {
	const generatedId = useId();
	const selectId = id ?? generatedId;

	const hintId = `${selectId}-hint`;
	const errorId = `${selectId}-error`;

	const describedBy =
		[ariaDescribedBy, hint && hintId, error && errorId]
			.filter(Boolean)
			.join(' ') || undefined;

	return (
		<div className="flex w-full flex-col gap-1">
			<Label
				htmlFor={selectId}
				required={required}
				className={clsx(disabled && 'opacity-50 cursor-not-allowed!')}
			>
				{label}
			</Label>

			<div className={clsx('relative', compact ? 'text-sm' : 'text-base')}>
				<select
					{...rest}
					id={selectId}
					disabled={disabled}
					required={required}
					aria-invalid={error ? true : ariaInvalid}
					aria-describedby={describedBy}
					className={clsx(
						baseStyles,
						dropdownStyles,
						optionStyles,
						compact ? 'h-8' : 'h-10',
						error
							? 'border-danger focus-visible:outline-danger'
							: 'border-border-default focus-visible:outline-primary',
						!error && 'enabled:hover:border-primary-hover',
						className,
					)}
				>
					{placeholder && (
						<option value="" disabled hidden>
							{placeholder}
						</option>
					)}

					{options.map((option) => (
						<option
							key={option.value}
							value={option.value}
							disabled={option.disabled}
						>
							{option.label}
						</option>
					))}
				</select>

				<ChevronDown
					className={clsx(
						'pointer-events-none absolute right-3 top-1/2',
						'-translate-y-1/2 size-[1.25em]',
						'hidden [@supports(appearance:base-select)]:block',
						'text-muted',
						disabled && 'opacity-50',
					)}
					aria-hidden="true"
				/>
			</div>

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
