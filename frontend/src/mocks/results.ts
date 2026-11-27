import type { Cluster, SegmentationResult } from '../types/segmentation';

const clusters: Cluster[] = [
	{
		clusterId: 0,
		size: 5,
		statistics: {
			ordersCount: 3.1,
			totalSpend: 1239.4,
			recencyDays: 17.4,
			averageOrderValue: 399.8,
		},
		centroid: { x: -1.2, y: 0.8 },
		users: [
			{ userId: 'user-1', x: -1.24, y: 0.82, assignments: [] },
			{ userId: 'user-2', x: -1.1, y: 0.75, assignments: [] },
			{ userId: 'user-3', x: -0.8, y: 1.2, assignments: [] },
			{ userId: 'user-4', x: -1.5, y: 0.4, assignments: [] },
			{ userId: 'user-5', x: -0.9, y: 0.5, assignments: [] },
		],
	},
	{
		clusterId: 1,
		size: 4,
		statistics: {
			ordersCount: 10.1,
			totalSpend: 8139.4,
			recencyDays: 2.4,
			averageOrderValue: 805.9,
		},
		centroid: { x: 1.2, y: -0.8 },
		users: [
			{ userId: 'user-6', x: 1.24, y: -0.82, assignments: [] },
			{ userId: 'user-7', x: 1.1, y: -0.75, assignments: [] },
			{ userId: 'user-8', x: 1.5, y: -0.4, assignments: [] },
			{ userId: 'user-9', x: 0.8, y: -1.1, assignments: [] },
		],
	},
	{
		clusterId: 2,
		size: 3,
		statistics: {
			ordersCount: 5.2,
			totalSpend: 3400.5,
			recencyDays: 8.3,
			averageOrderValue: 653.9,
		},
		centroid: { x: 0.2, y: 1.5 },
		users: [
			{ userId: 'user-10', x: 0.2, y: 1.5, assignments: [] },
			{ userId: 'user-11', x: 0.5, y: 1.3, assignments: [] },
			{ userId: 'user-12', x: -0.1, y: 1.7, assignments: [] },
		],
	},
];

const baseResult = {
	features: ['ordersCount', 'totalSpend', 'recencyDays', 'averageOrderValue'],
	clusters,
	metrics: {
		silhouetteScore: 0.72,
		daviesbouldinScore: 0.81,
	},
	visualization: {
		method: 'pca',
		components: 2,
		explainedVarianceRatio: [0.41, 0.23],
	},
};

// todo- replace with backend data
export const segmentationResults: Record<string, SegmentationResult> = {
	'run-001': {
		...baseResult,
		runId: 'run-001',
		algorithm: 'kmeans',
		parameters: {
			n_clusters: 3,
			max_iter: 300,
		},
	},
	'run-002': {
		...baseResult,
		runId: 'run-002',
		algorithm: 'dbscan',
		parameters: {
			esp: 0.5,
			min_samples: 4,
			metric: 'euclidean',
		},
		metrics: {
			silhouetteScore: 0.64,
			daviesbouldinScore: 0.92,
		},
	},
	'run-003': {
		...baseResult,
		runId: 'run-003',
		algorithm: 'kmeans',
		parameters: {
			n_clusters: 3,
			max_iter: 500,
		},
		metrics: {
			silhouetteScore: 0.79,
			daviesbouldinScore: 0.75,
		},
	},
};
