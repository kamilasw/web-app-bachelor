import type { SegmentationRun } from '../types/segmentation';

//to-do: removethis after adding abckend
export const runs: SegmentationRun[] = [
	{
		run_id: 'run-001',
		client_id: 'client-001',
		algorithm: 'kmeans',
		name: 'High-value customers',
		filepath: 'client-001/run-001.json',
	},
	{
		run_id: 'run-002',
		client_id: 'client-001',
		algorithm: 'dbscan',
		name: 'Purchasing patterns',
		filepath: 'client-001/run-002.json',
	},
	{
		run_id: 'run-003',
		client_id: 'client-001',
		algorithm: 'kmeans',
		name: 'Customer behaviour analysis',
		filepath: 'client-001/run-003.json',
	},
];
