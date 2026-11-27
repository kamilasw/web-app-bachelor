import type { Widget } from '../types/widget';

// TODO: Retrieve widgets from Supabase.
export const widgets: Widget[] = [
	{
		widget_id: 'widget-001',
		client_id: 'client-001',
		run_id: 'run-001',
		name: 'Cluster distribution',
		type: 'pie',
		x_label: '',
		y_label: '',
	},
	{
		widget_id: 'widget-002',
		client_id: 'client-001',
		run_id: 'run-002',
		name: 'Customer segments',
		type: 'scatter',
		x_label: 'PC1',
		y_label: 'PC2',
	},
	{
		widget_id: 'widget-003',
		client_id: 'client-001',
		run_id: 'run-001',
		name: 'Average spending',
		type: 'bar',
		x_label: 'clusterId',
		y_label: 'totalSpend',
	},
	{
		widget_id: 'widget-004',
		client_id: 'client-001',
		run_id: 'run-003',
		name: 'Clustering performance',
		type: 'metric',
		x_label: '',
		y_label: 'silhouetteScore',
	},
	{
		widget_id: 'widget-005',
		client_id: 'client-001',
		run_id: 'run-002',
		name: 'Order frequency',
		type: 'bar',
		x_label: 'clusterId',
		y_label: 'ordersCount',
	},
];
