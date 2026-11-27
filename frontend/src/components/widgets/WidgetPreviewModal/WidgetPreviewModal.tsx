import { useState } from 'react';
import { X } from 'lucide-react';

import { Modal } from '../../ui/Modal/Modal';
import { Button } from '../../ui/Button/Button';

import { WidgetRenderer } from '../WidgetRenderer/WidgetRenderer';
import { ClusterDetails } from '../details/ClusterDetails/ClusterDetails';
import { CustomerDetails } from '../details/CustomerDetails/CustomerDetails';

import type { Widget, WidgetSelection } from '../../../types/widget';

import type { SegmentationResult, UserData } from '../../../types/segmentation';

interface WidgetPreviewModalProps {
	widget: Widget;
	result?: SegmentationResult;
	userData?: UserData;
	onClose: () => void;
}

export function WidgetPreviewModal({
	widget,
	result,
	userData,
	onClose,
}: WidgetPreviewModalProps) {
	const [selection, setSelection] = useState<WidgetSelection | null>(null);

	const cluster = result?.clusters.find(
		(cluster) => cluster.clusterId === selection?.clusterId,
	);

	const customer =
		selection?.type === 'customer'
			? cluster?.users.find((user) => user.userId === selection.userId)
			: undefined;

	const userFeatures = userData?.users.find(
		(user) => user.userId === customer?.userId,
	);

	return (
		<Modal
			open
			title={widget.name}
			onClose={onClose}
			footer={
				<Button appearance="default" onClick={onClose}>
					Close
				</Button>
			}
		>
			{result ? (
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<div className="h-80 w-full">
							<WidgetRenderer
								widget={widget}
								result={result}
								onSelect={setSelection}
							/>
						</div>

						{widget.type !== 'metric' && (
							<p className="text-center text-sm text-muted">
								Click a data point to view its details.
							</p>
						)}
					</div>

					{selection && cluster && (
						<div className="flex flex-col gap-3 border-t border-border-default pt-4">
							<div className="flex justify-end">
								<Button
									appearance="subtle"
									size="sm"
									compact
									icon={X}
									aria-label="Close details"
									onClick={() => setSelection(null)}
								/>
							</div>

							{selection.type === 'customer' && customer ? (
								<CustomerDetails
									customer={customer}
									userFeatures={userFeatures}
									cluster={cluster}
								/>
							) : (
								<ClusterDetails cluster={cluster} />
							)}
						</div>
					)}
				</div>
			) : (
				<p className="text-sm text-muted">
					Segmentation results are unavailable.
				</p>
			)}
		</Modal>
	);
}
