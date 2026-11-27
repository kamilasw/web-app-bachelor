export type ParameterValue = string | number | boolean;

export interface AlgorithmParameter {
	name: string;
	label: string;
	type: 'number' | 'text' | 'select' | 'boolean';
	required?: boolean;
	description?: string;
	defaultValue?: ParameterValue;
	min?: number;
	max?: number;
	step?: number;
	options?: {
		label: string;
		value: string;
	}[];
}

export interface Algorithm {
	id: string;
	name: string;
	parameters: AlgorithmParameter[];
}

export interface SegmentationRequest {
	name: string;
	algorithm: string;
	parameters: Record<string, ParameterValue>;
}

export interface SegmentationRun {
	run_id: string;
	client_id: string;
	algorithm: string;
	name: string;
	filepath: string;
}
