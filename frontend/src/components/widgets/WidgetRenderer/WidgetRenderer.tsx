import { BarChart } from '../charts/BarChart/BarChart';
import { PieChart } from '../charts/PieChart/PieChart';
import { ScatterChart } from '../charts/ScatterChart/ScatterChart';
import { MetricCard } from '../charts/MetricCard/MetricCard';

import { getFeatureLabel } from '../../../constants/features';
import { METRICS } from '../../../constants/metrics';

import type { WidgetFormData, WidgetSelection } from '../../../types/widget';

import type {
	SegmentationResult,
	SegmentationMetrics,
} from '../../../types/segmentation';

interface WidgetRendererProps {
	widget: WidgetFormData;
	result: SegmentationResult;
	onSelect?: (selection: WidgetSelection) => void;
}

export function WidgetRenderer({
	widget,
	result,
	onSelect,
}: WidgetRendererProps) {
	switch (widget.type) {
		case 'bar': {
			const data = result.clusters
				.filter((cluster) =>
					Number.isFinite(cluster.statistics[widget.y_label]),
				)
				.map((cluster) => ({
					id: String(cluster.clusterId),
					category: `Cluster ${cluster.clusterId}`,
					value: cluster.statistics[widget.y_label],
				}));

			if (!data.length) {
				return <p className="text-sm text-muted">No data available.</p>;
			}

			return (
				<BarChart
					data={data}
					xLabel={getFeatureLabel(widget.x_label)}
					yLabel={getFeatureLabel(widget.y_label)}
					onBarClick={(datum) =>
						onSelect?.({
							type: 'cluster',
							clusterId: Number(datum.id),
						})
					}
				/>
			);
		}

		case 'pie': {
			const data = result.clusters.map((cluster) => ({
				id: String(cluster.clusterId),
				category: `Cluster ${cluster.clusterId}`,
				value: cluster.size,
			}));

			return (
				<PieChart
					data={data}
					valueLabel="Customers"
					onSliceClick={(datum) =>
						onSelect?.({
							type: 'cluster',
							clusterId: Number(datum.id),
						})
					}
				/>
			);
		}

		case 'scatter': {
			const groups = result.clusters.map((cluster) => ({
				id: String(cluster.clusterId),
				name: `Cluster ${cluster.clusterId}`,
				data: cluster.users.map((user) => ({
					id: user.userId,
					x: user.x,
					y: user.y,
				})),
			}));

			return (
				<ScatterChart
					groups={groups}
					xLabel={getFeatureLabel(widget.x_label)}
					yLabel={getFeatureLabel(widget.y_label)}
					onPointClick={(point, group) =>
						onSelect?.({
							type: 'customer',
							clusterId: Number(group.id),
							userId: point.id,
						})
					}
				/>
			);
		}

		case 'metric': {
			const metric = widget.y_label as keyof SegmentationMetrics;

			const value = result.metrics[metric];
			const metadata = METRICS[metric];

			if (!metadata || !Number.isFinite(value)) {
				return <p className="text-sm text-muted">Metric unavailable.</p>;
			}

			return (
				<MetricCard
					label={metadata.label}
					value={value}
					description={metadata.description}
				/>
			);
		}

		default:
			return <p className="text-sm text-muted">Unsupported widget type.</p>;
	}
}
