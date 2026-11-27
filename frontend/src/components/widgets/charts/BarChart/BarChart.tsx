import { AgCharts } from 'ag-charts-react';
import type { AgCartesianChartOptions } from 'ag-charts-community';

import { CHART_THEME } from '../../../../styles/chartTheme';
import type { CategoryDatum } from '../../../../types/charts';

interface BarChartProps {
	data: CategoryDatum[];
	xLabel?: string;
	yLabel?: string;
	onBarClick?: (datum: CategoryDatum) => void;
}

export function BarChart({
	data,
	xLabel = 'Category',
	yLabel = 'Value',
	onBarClick,
}: BarChartProps) {
	const options: AgCartesianChartOptions = {
		theme: CHART_THEME,
		data,

		axes: {
			x: {
				type: 'category',
				title: { text: xLabel },
			},
			y: {
				type: 'number',
				title: { text: yLabel },
			},
		},

		series: [
			{
				type: 'bar',
				xKey: 'category',
				yKey: 'value',
				xName: xLabel,
				yName: yLabel,

				tooltip: {
					renderer: ({ datum }) => ({
						heading: datum.category,
						data: [
							{
								label: yLabel,
								value: datum.value.toFixed(2),
							},
						],
					}),
				},

				listeners: {
					seriesNodeClick: ({ datum }) => onBarClick?.(datum),
				},
			},
		],

		legend: {
			enabled: false,
		},
	};

	return (
		<AgCharts options={options} style={{ width: '100%', height: '100%' }} />
	);
}
