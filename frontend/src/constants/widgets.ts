import { ChartColumn, ChartPie, ChartScatter, Hash } from 'lucide-react';

import type { LucideIcon } from 'lucide-react';
import type { VisualizationWidgetType } from '../types/widget';

export const WIDGET_TYPES = [
	{
		value: 'bar',
		label: 'Bar chart',
		icon: ChartColumn,
	},
	{
		value: 'pie',
		label: 'Pie chart',
		icon: ChartPie,
	},
	{
		value: 'scatter',
		label: 'Scatter plot',
		icon: ChartScatter,
	},
	{
		value: 'metric',
		label: 'Metric card',
		icon: Hash,
	},
] satisfies {
	value: VisualizationWidgetType;
	label: string;
	icon: LucideIcon;
}[];
