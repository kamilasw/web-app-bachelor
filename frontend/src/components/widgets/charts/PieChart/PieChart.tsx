import { AgCharts } from 'ag-charts-react';
import type { AgPolarChartOptions } from 'ag-charts-community';

import { CHART_THEME } from '../../../../styles/chartTheme';
import type { CategoryDatum } from '../../../../types/charts';

interface PieChartProps {
	data: CategoryDatum[];
	valueLabel?: string;
	onSliceClick?: (datum: CategoryDatum) => void;
}

export function PieChart({
	data,
	valueLabel = 'Value',
	onSliceClick,
}: PieChartProps) {
	const total = data.reduce((sum, item) => sum + item.value, 0);

	const options: AgPolarChartOptions<CategoryDatum> = {
		theme: CHART_THEME,
		data,

		series: [
			{
				type: 'pie',
				angleKey: 'value',
				legendItemKey: 'category',
				calloutLabelKey: 'category',

				tooltip: {
					renderer: ({ datum }) => ({
						heading: datum.category,
						data: [
							{
								label: valueLabel,
								value: String(datum.value),
							},
							{
								label: 'Percentage',
								value: total
									? `${((datum.value / total) * 100).toFixed(1)}%`
									: '0%',
							},
						],
					}),
				},

				listeners: {
					seriesNodeClick: ({ datum }) => onSliceClick?.(datum),
				},
			},
		],

		legend: {
			position: 'bottom',
		},
	};

	return (
		<AgCharts options={options} style={{ width: '100%', height: '100%' }} />
	);
}
