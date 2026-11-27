import { useId, useState } from 'react';
import type { SubmitEvent } from 'react';

import { Modal } from '../../ui/Modal/Modal';
import { Button } from '../../ui/Button/Button';
import { Input } from '../../ui/Input/Input';
import { Select } from '../../ui/Select/Select';

import { AlgorithmParameterField } from '../AlgorithmParameterField/AlgorithmParameterField';

import type {
	Algorithm,
	ParameterValue,
	SegmentationRequest,
} from '../../../types/segmentation';

interface SegmentationRequestModalProps {
	open: boolean;
	algorithms: Algorithm[];
	onClose: () => void;
	onSubmit: (request: SegmentationRequest) => void;
}

export function SegmentationRequestModal({
	open,
	algorithms,
	onClose,
	onSubmit,
}: SegmentationRequestModalProps) {
	const formId = useId();

	const [algorithmId, setAlgorithmId] = useState('');
	const [name, setName] = useState('');

	const [parameters, setParameters] = useState<Record<string, ParameterValue>>(
		{},
	);

	const [errors, setErrors] = useState<Record<string, string>>({});

	const selectedAlgorithm = algorithms.find(
		(algorithm) => algorithm.id === algorithmId,
	);

	const handleAlgorithmChange = (id: string) => {
		setAlgorithmId(id);
		setErrors({});

		const algorithm = algorithms.find((algorithm) => algorithm.id === id);

		const defaults = Object.fromEntries(
			(algorithm?.parameters ?? []).map((parameter) => [
				parameter.name,
				parameter.defaultValue ?? (parameter.type === 'boolean' ? false : ''),
			]),
		);

		setParameters(defaults);
	};

	const handleParameterChange = (name: string, value: ParameterValue) => {
		setParameters((previous) => ({
			...previous,
			[name]: value,
		}));

		setErrors((previous) => ({
			...previous,
			[name]: '',
		}));
	};

	const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!selectedAlgorithm || !name.trim()) return;

		const validationErrors: Record<string, string> = {};

		for (const parameter of selectedAlgorithm.parameters) {
			const value = parameters[parameter.name];

			const empty =
				value === undefined || (typeof value === 'string' && !value.trim());

			if (parameter.required && empty) {
				validationErrors[parameter.name] = 'This field is required.';
				continue;
			}

			if (parameter.type === 'select' && !empty) {
				const valid = parameter.options?.some(
					(option) => option.value === value,
				);

				if (!valid) {
					validationErrors[parameter.name] = 'Select a valid option.';
				}
			}
		}

		setErrors(validationErrors);

		if (Object.keys(validationErrors).length > 0) return;

		onSubmit({
			name: name.trim(),
			algorithm: selectedAlgorithm.id,
			parameters: Object.fromEntries(
				Object.entries(parameters).filter(
					([, value]) => typeof value !== 'string' || value.trim() !== '',
				),
			),
		});
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			title="New segmentation run request"
			footer={
				<>
					<Button appearance="default" type="button" onClick={onClose}>
						Cancel
					</Button>

					<Button
						appearance="primary"
						type="submit"
						form={formId}
						disabled={!selectedAlgorithm || !name.trim()}
					>
						Request segmentation
					</Button>
				</>
			}
		>
			<form id={formId} onSubmit={handleSubmit} className="flex flex-col gap-4">
				<Select
					label="Algorithm"
					name="algorithm"
					placeholder="Select an algorithm"
					options={algorithms.map((algorithm) => ({
						label: algorithm.name,
						value: algorithm.id,
					}))}
					value={algorithmId}
					onChange={(event) => handleAlgorithmChange(event.target.value)}
					required
				/>

				{selectedAlgorithm && (
					<>
						<Input
							label="Run name"
							name="runName"
							value={name}
							onChange={(event) => setName(event.target.value)}
							placeholder="Enter a run name"
							required
						/>

						<div className="border-t border-default" />

						{selectedAlgorithm.parameters.map((parameter) => (
							<AlgorithmParameterField
								key={`${algorithmId}-${parameter.name}`}
								parameter={parameter}
								value={parameters[parameter.name] ?? ''}
								error={errors[parameter.name]}
								onChange={(value) =>
									handleParameterChange(parameter.name, value)
								}
							/>
						))}
					</>
				)}
			</form>
		</Modal>
	);
}
