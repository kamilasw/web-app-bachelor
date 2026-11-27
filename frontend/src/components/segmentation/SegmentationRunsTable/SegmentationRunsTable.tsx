import { Download, Eye } from 'lucide-react';

import { Button } from '../../ui/Button/Button';
import { Table } from '../../ui/Table/Table';
import type { TableColumn } from '../../ui/Table/Table';

import type { Algorithm, SegmentationRun } from '../../../types/segmentation';

interface SegmentationRunsTableProps {
	runs: SegmentationRun[];
	algorithms: Algorithm[];
	onView: (run: SegmentationRun) => void;
	onDownload: (run: SegmentationRun) => void;
}

export function SegmentationRunsTable({
	runs,
	algorithms,
	onView,
	onDownload,
}: SegmentationRunsTableProps) {
	const columns: TableColumn<SegmentationRun>[] = [
		{
			key: 'name',
			label: 'Name',
			render: (run) => <span className="font-medium">{run.name}</span>,
		},
		{
			key: 'algorithm',
			label: 'Algorithm',
			render: (run) =>
				algorithms.find((algorithm) => algorithm.id === run.algorithm)?.name ??
				run.algorithm,
		},
		{
			key: 'actions',
			label: 'Actions',
			render: (run) => (
				<div className="flex items-center gap-2">
					<Button
						appearance="subtle"
						size="sm"
						compact
						icon={Eye}
						aria-label={`View ${run.name}`}
						title="View results"
						onClick={() => onView(run)}
					/>

					<Button
						appearance="subtle"
						size="sm"
						compact
						icon={Download}
						aria-label={`Download ${run.name}`}
						title="Download JSON"
						onClick={() => onDownload(run)}
					/>
				</div>
			),
		},
	];

	return (
		<Table
			columns={columns}
			rows={runs}
			getRowKey={(run) => run.run_id}
			emptyMessage="No segmentation runs found."
		/>
	);
}
