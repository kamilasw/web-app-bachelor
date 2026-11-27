import type { SegmentationMetrics } from '../types/segmentation';

export const METRICS: Record<
	keyof SegmentationMetrics,
	{
		label: string;
		description: string;
	}
> = {
	silhouetteScore: {
		label: 'Silhouette score',
		description: 'Measures cluster cohesion and separation. Higher is better.',
	},
	daviesbouldinScore: {
		label: 'Davies-Bouldin score',
		description: 'Measures similarity between clusters. Lower is better.',
	},
};
