import { Input } from '../../ui/Input/Input';
import { Select } from '../../ui/Select/Select';
import { Checkbox } from '../../ui/Checkbox/Checkbox';

import type {
	AlgorithmParameter,
	ParameterValue,
} from '../../../types/segmentation';

interface AlgorithmParameterFieldProps {
	parameter: AlgorithmParameter;
	value: ParameterValue;
	onChange: (value: ParameterValue) => void;
	error?: string;
}

export function AlgorithmParameterField({
	parameter,
	value,
	onChange,
	error,
}: AlgorithmParameterFieldProps) {
	switch (parameter.type) {
		case 'select':
			return (
				<div className="flex flex-col gap-1">
					<Select
						label={parameter.label}
						name={parameter.name}
						options={parameter.options ?? []}
						value={String(value)}
						required={parameter.required}
						onChange={(event) => onChange(event.target.value)}
					/>

					{error && (
						<p role="alert" className="text-sm text-danger">
							{error}
						</p>
					)}
				</div>
			);

		case 'boolean':
			return (
				<Checkbox
					label={parameter.label}
					name={parameter.name}
					checked={value === true}
					onChange={(event) => onChange(event.target.checked)}
				/>
			);

		default:
			return (
				<Input
					label={parameter.label}
					name={parameter.name}
					type={parameter.type}
					value={String(value)}
					hint={parameter.description}
					error={error}
					required={parameter.required}
					min={parameter.min}
					max={parameter.max}
					step={parameter.step}
					onChange={(event) => {
						const input = event.target.value;

						onChange(
							parameter.type === 'number' && input !== ''
								? Number(input)
								: input,
						);
					}}
				/>
			);
	}
}
