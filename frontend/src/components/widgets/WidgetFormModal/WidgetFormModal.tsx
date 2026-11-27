import { useId, useState } from 'react';
import type { SubmitEvent } from 'react';

import { Button } from '../../ui/Button/Button';
import { Input } from '../../ui/Input/Input';
import { Select } from '../../ui/Select/Select';
import { Modal } from '../../ui/Modal/Modal';

import { WidgetRenderer } from '../WidgetRenderer/WidgetRenderer';

import { WIDGET_TYPES } from '../../../constants/widgets';
import { getFeatureLabel } from '../../../constants/features';
import { METRICS } from '../../../constants/metrics';

import type {
	Widget,
	WidgetFormData,
	VisualizationWidgetType,
} from '../../../types/widget';

import type {
	SegmentationRun,
	SegmentationResult,
} from '../../../types/segmentation';

interface WidgetFormModalProps {
	widget?: Widget;
	runs: SegmentationRun[];
	results: Record<string, SegmentationResult>;
	onClose: () => void;
	onSubmit: (data: WidgetFormData) => void;
}

export function WidgetFormModal({
	widget,
	runs,
	results,
	onClose,
	onSubmit,
}: WidgetFormModalProps) {
	const formId = useId();

	const [runId, setRunId] = useState(widget?.run_id ?? '');
	const [type, setType] = useState<VisualizationWidgetType | ''>(
		widget?.type ?? '',
	);
	const [name, setName] = useState(widget?.name ?? '');
	const [feature, setFeature] = useState(widget?.y_label ?? '');

	const result = results[runId];

	const featureOptions = (result?.features ?? []).map((feature) => ({
		value: feature,
		label: getFeatureLabel(feature),
	}));

	const metricOptions = Object.entries(METRICS).map(([value, metric]) => ({
		value,
		label: metric.label,
	}));

	const handleRunChange = (value: string) => {
		setRunId(value);
		setType('');
		setFeature('');
	};

	const handleTypeChange = (value: string) => {
		setType(value as VisualizationWidgetType);
		setFeature('');
	};

	const getWidgetData = (): WidgetFormData | null => {
		if (!runId || !type || !result) return null;

		let xLabel = '';
		let yLabel = '';

		switch (type) {
			case 'bar':
				if (!featureOptions.some((option) => option.value === feature))
					return null;

				xLabel = 'clusterId';
				yLabel = feature;
				break;

			case 'scatter':
				xLabel = 'PC1';
				yLabel = 'PC2';
				break;

			case 'metric':
				if (!metricOptions.some((option) => option.value === feature))
					return null;

				yLabel = feature;
				break;
		}

		return {
			run_id: runId,
			name: name.trim(),
			type,
			x_label: xLabel,
			y_label: yLabel,
		};
	};

	const widgetData = getWidgetData();

	const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!widgetData || !name.trim()) return;

		onSubmit(widgetData);
	};

	return (
		<Modal
			open
			title={widget ? 'Edit widget' : 'New widget'}
			onClose={onClose}
			footer={
				<>
					<Button appearance="default" onClick={onClose}>
						Cancel
					</Button>

					<Button
						appearance="primary"
						type="submit"
						form={formId}
						disabled={!widgetData || !name.trim()}
					>
						{widget ? 'Save changes' : 'Create widget'}
					</Button>
				</>
			}
		>
			<form id={formId} onSubmit={handleSubmit} className="flex flex-col gap-4">
				<Select
					label="Segmentation run"
					placeholder="Select a segmentation run"
					options={runs.map((run) => ({
						value: run.run_id,
						label: run.name,
					}))}
					value={runId}
					onChange={(event) => handleRunChange(event.target.value)}
					required
				/>

				{runId && !result && (
					<p className="text-sm text-danger">
						Segmentation results are unavailable.
					</p>
				)}

				{result && (
					<Select
						label="Graph type"
						placeholder="Select a graph type"
						options={WIDGET_TYPES.map((type) => ({
							value: type.value,
							label: type.label,
						}))}
						value={type}
						onChange={(event) => handleTypeChange(event.target.value)}
						required
					/>
				)}

				{result && type && (
					<>
						<Input
							label="Widget name"
							placeholder="Enter a widget name"
							value={name}
							onChange={(event) => setName(event.target.value)}
							required
						/>

						{type === 'bar' && (
							<Select
								label="Feature"
								placeholder="Select a feature"
								options={featureOptions}
								value={feature}
								onChange={(event) => setFeature(event.target.value)}
								required
							/>
						)}

						{type === 'metric' && (
							<Select
								label="Evaluation metric"
								placeholder="Select a metric"
								options={metricOptions}
								value={feature}
								onChange={(event) => setFeature(event.target.value)}
								required
							/>
						)}
					</>
				)}

				{widgetData && result && (
					<div className="flex flex-col gap-3 border-t border-border-default pt-4">
						<h3 className="font-medium">Preview</h3>

						<div className="h-64 w-full min-w-0">
							<WidgetRenderer widget={widgetData} result={result} />
						</div>
					</div>
				)}
			</form>
		</Modal>
	);
}
