import { ClusterDetails } from '../ClusterDetails/ClusterDetails';

import { getFeatureLabel } from '../../../../constants/features';

import type {
	Cluster,
	ClusterUser,
	UserFeatures,
} from '../../../../types/segmentation';

interface CustomerDetailsProps {
	customer: ClusterUser;
	userFeatures?: UserFeatures;
	cluster: Cluster;
}

export function CustomerDetails({
	customer,
	userFeatures,
	cluster,
}: CustomerDetailsProps) {
	return (
		<div className="flex flex-col gap-4">
			<div>
				<h3 className="text-lg font-semibold">Customer details</h3>

				<p className="break-all text-sm text-muted">ID: {customer.userId}</p>
			</div>

			<div className="flex flex-col gap-2">
				<h4 className="font-medium">Customer features</h4>

				{userFeatures ? (
					<dl className="divide-y divide-border-default">
						{Object.entries(userFeatures.features).map(([feature, value]) => (
							<div
								key={feature}
								className="flex items-center justify-between gap-4 py-2"
							>
								<dt className="text-sm text-muted">
									{getFeatureLabel(feature)}
								</dt>

								<dd className="font-medium tabular-nums">
									{value.toLocaleString(undefined, {
										maximumFractionDigits: 2,
									})}
								</dd>
							</div>
						))}
					</dl>
				) : (
					<p className="text-sm text-muted">
						Customer features are unavailable.
					</p>
				)}
			</div>

			<div className="flex flex-col gap-2">
				<h4 className="font-medium">PCA coordinates</h4>

				<div className="grid grid-cols-2 gap-3">
					<div className="rounded-sm bg-background p-3">
						<p className="text-sm text-muted">PC1</p>
						<p className="text-lg font-semibold tabular-nums">
							{customer.x.toFixed(2)}
						</p>
					</div>

					<div className="rounded-sm bg-background p-3">
						<p className="text-sm text-muted">PC2</p>
						<p className="text-lg font-semibold tabular-nums">
							{customer.y.toFixed(2)}
						</p>
					</div>
				</div>
			</div>

			<div className="border-t border-border-default pt-4">
				<ClusterDetails cluster={cluster} />
			</div>
		</div>
	);
}
