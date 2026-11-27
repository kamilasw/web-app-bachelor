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

export interface Point {
	x: number;
	y: number;
}

export interface ClusterUser extends Point {
	userId: string;
	assignments: unknown[];
}

export interface Cluster {
	clusterId: number;
	size: number;
	statistics: Record<string, number>;
	centroid: Point;
	users: ClusterUser[];
}

export interface SegmentationMetrics {
	silhouetteScore: number;
	daviesbouldinScore: number;
}

export interface SegmentationVisualization {
	method: string;
	components: number;
	explainedVarianceRatio: number[];
}

export interface SegmentationResult {
	runId: string;
	algorithm: string;
	parameters: Record<string, ParameterValue>;
	features: string[];
	metrics: SegmentationMetrics;
	clusters: Cluster[];
	visualization: SegmentationVisualization;
}
