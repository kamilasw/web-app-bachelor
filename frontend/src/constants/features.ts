export const FEATURE_LABELS: Record<string, string> = {
	clusterId: 'Cluster',
	ordersCount: 'Number of orders',
	totalSpend: 'Total spending',
	recencyDays: 'Recency (days)',
	averageOrderValue: 'Average order value',
	PC1: 'PC1',
	PC2: 'PC2',
};

export function getFeatureLabel(feature: string): string {
	return FEATURE_LABELS[feature] ?? feature;
}
