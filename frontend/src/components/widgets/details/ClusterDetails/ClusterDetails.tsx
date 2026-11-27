import { getFeatureLabel } from '../../../../constants/features';
import type { Cluster } from '../../../../types/segmentation';

interface ClusterDetailsProps {
	cluster: Cluster;
}

export function ClusterDetails({ cluster }: ClusterDetailsProps) {
	return (
		<div className="flex flex-col gap-4">
			<div>
				<h3 className="text-lg font-semibold">Cluster {cluster.clusterId}</h3>

				<p className="text-sm text-muted">{cluster.size} customers</p>
			</div>

			<div className="flex flex-col gap-2">
				<h4 className="font-medium">Feature statistics</h4>

				<dl className="divide-y divide-border-default">
					{Object.entries(cluster.statistics).map(([feature, value]) => (
						<div
							key={feature}
							className="flex items-center justify-between gap-4 py-2"
						>
							<dt className="text-sm text-muted">{getFeatureLabel(feature)}</dt>

							<dd className="font-medium tabular-nums">
								{value.toLocaleString(undefined, {
									maximumFractionDigits: 2,
								})}
							</dd>
						</div>
					))}
				</dl>
			</div>

			<div className="flex flex-col gap-2">
				<h4 className="font-medium">Centroid</h4>

				<div className="grid grid-cols-2 gap-3">
					<div className="rounded-sm bg-background p-3">
						<p className="text-sm text-muted">PC1</p>
						<p className="text-lg font-semibold tabular-nums">
							{cluster.centroid.x.toFixed(2)}
						</p>
					</div>

					<div className="rounded-sm bg-background p-3">
						<p className="text-sm text-muted">PC2</p>
						<p className="text-lg font-semibold tabular-nums">
							{cluster.centroid.y.toFixed(2)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
