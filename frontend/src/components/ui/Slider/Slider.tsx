import { useId, useState } from 'react';
import type { ChangeEvent, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

import { Label } from '../Label/Label';

// Types
interface SliderProps extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'type' | 'size' | 'value' | 'defaultValue' | 'min' | 'max' | 'step'
> {
	label: string;
	hint?: string;
	min?: number;
	max?: number;
	step?: number;
	value?: number;
	defaultValue?: number;
}

// Styles
const baseStyles = clsx(
	'w-full h-2 appearance-none rounded-full bg-neutral-hover',
	'cursor-pointer',
	'focus-visible:outline-2 focus-visible:outline-offset-4',
	'focus-visible:outline-primary',
	'disabled:cursor-not-allowed disabled:opacity-50',

	'[&::-webkit-slider-thumb]:appearance-none',
	'[&::-webkit-slider-thumb]:size-4',
	'[&::-webkit-slider-thumb]:rounded-full',
	'[&::-webkit-slider-thumb]:bg-primary',
	'[&::-webkit-slider-thumb]:border-2',
	'[&::-webkit-slider-thumb]:border-surface',
	'[&::-webkit-slider-thumb]:shadow-sm',

	'[&::-moz-range-thumb]:size-4',
	'[&::-moz-range-thumb]:rounded-full',
	'[&::-moz-range-thumb]:bg-primary',
	'[&::-moz-range-thumb]:border-2',
	'[&::-moz-range-thumb]:border-surface',
	'[&::-moz-range-thumb]:shadow-sm',
);

// Component
export function Slider({
	label,
	hint,
	min = 0,
	max = 100,
	step = 1,
	value,
	defaultValue,
	onChange,
	id,
	disabled = false,
	className,
	'aria-describedby': ariaDescribedBy,
	...rest
}: SliderProps) {
	const generatedId = useId();
	const sliderId = id ?? generatedId;
	const hintId = `${sliderId}-hint`;

	const [internalValue, setInternalValue] = useState(defaultValue ?? min);

	const currentValue = value ?? internalValue;

	const describedBy = clsx(ariaDescribedBy, hint && hintId) || undefined;

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		if (value === undefined) {
			setInternalValue(event.currentTarget.valueAsNumber);
		}

		onChange?.(event);
	}

	return (
		<div className="flex w-full flex-col gap-2">
			<div className="flex items-center justify-between gap-4">
				<Label
					htmlFor={sliderId}
					className={clsx(disabled && 'opacity-50 cursor-not-allowed!')}
				>
					{label}
				</Label>

				<output
					htmlFor={sliderId}
					className="text-sm font-medium text-foreground tabular-nums"
				>
					{currentValue}
				</output>
			</div>

			<input
				{...rest}
				id={sliderId}
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				defaultValue={value === undefined ? (defaultValue ?? min) : undefined}
				onChange={handleChange}
				disabled={disabled}
				aria-describedby={describedBy}
				className={clsx(baseStyles, className)}
			/>

			<div className="flex justify-between text-xs text-muted">
				<span>{min}</span>
				<span>{max}</span>
			</div>

			{hint && (
				<p id={hintId} className="text-xs text-muted">
					{hint}
				</p>
			)}
		</div>
	);
}
