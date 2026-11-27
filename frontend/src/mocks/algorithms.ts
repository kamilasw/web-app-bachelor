import type { Algorithm } from '../types/segmentation';

// to-do : add from backend and remove this
export const algorithms: Algorithm[] = [
	{
		id: 'kmeans',
		name: 'K-means',
		parameters: [
			{
				name: 'n_clusters',
				label: 'Number of clusters',
				type: 'number',
				required: true,
				defaultValue: 3,
				min: 2,
				step: 1,
			},
			{
				name: 'max_iter',
				label: 'Maximum iterations',
				type: 'number',
				defaultValue: 300,
				min: 1,
				step: 1,
			},
		],
	},
	{
		id: 'dbscan',
		name: 'DBSCAN',
		parameters: [
			{
				name: 'esp',
				label: 'Epsilon',
				type: 'number',
				required: true,
				defaultValue: 0.5,
				min: 0.01,
				step: 0.01,
			},
			{
				name: 'min_samples',
				label: 'Minimum samples',
				type: 'number',
				required: true,
				defaultValue: 4,
				min: 1,
				step: 1,
			},
			{
				name: 'metric',
				label: 'Distance metric',
				type: 'select',
				required: true,
				defaultValue: 'euclidean',
				options: [
					{ label: 'Euclidean', value: 'euclidean' },
					{ label: 'Manhattan', value: 'manhattan' },
				],
			},
		],
	},
];
