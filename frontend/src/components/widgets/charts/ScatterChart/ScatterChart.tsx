import { AgCharts } from 'ag-charts-react';
import type { AgCartesianChartOptions } from 'ag-charts-community';

import { CHART_THEME } from '../../../../styles/chartTheme';

import type { ScatterPoint, ScatterGroup } from '../../../../types/charts';

interface ScatterChartProps {
	groups: ScatterGroup[];
	xLabel?: string;
	yLabel?: string;
	onPointClick?: (point: ScatterPoint, group: ScatterGroup) => void;
}

export function ScatterChart({
	groups,
	xLabel = 'X',
	yLabel = 'Y',
	onPointClick,
}: ScatterChartProps) {
	const options: AgCartesianChartOptions<ScatterPoint> = {
		theme: CHART_THEME,

		axes: {
			x: {
				type: 'number',
				title: { text: xLabel },
			},
			y: {
				type: 'number',
				title: { text: yLabel },
			},
		},

		series: groups.map((group) => ({
			type: 'scatter',
			title: group.name,
			data: group.data,

			xKey: 'x',
			yKey: 'y',
			xName: xLabel,
			yName: yLabel,

			tooltip: {
				renderer: ({ datum }) => ({
					heading: group.name,
					data: [
						{
							label: 'ID',
							value: datum.id,
						},
						{
							label: xLabel,
							value: datum.x.toFixed(2),
						},
						{
							label: yLabel,
							value: datum.y.toFixed(2),
						},
					],
				}),
			},

			listeners: {
				seriesNodeClick: ({ datum }) => onPointClick?.(datum, group),
			},
		})),

		legend: {
			position: 'bottom',
		},
	};

	return (
		<AgCharts options={options} style={{ width: '100%', height: '100%' }} />
	);
}
