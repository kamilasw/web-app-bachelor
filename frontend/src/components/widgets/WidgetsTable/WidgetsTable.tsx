import { Eye, Pencil, Trash2 } from 'lucide-react';

import { Button } from '../../ui/Button/Button';
import { Table } from '../../ui/Table/Table';

import type { TableColumn } from '../../ui/Table/Table';
import type { Widget } from '../../../types/widget';
import type { SegmentationRun } from '../../../types/segmentation';

import { WIDGET_TYPES } from '../../../constants/widgets';

interface WidgetsTableProps {
	widgets: Widget[];
	runs: SegmentationRun[];
	onView: (widget: Widget) => void;
	onEdit: (widget: Widget) => void;
	onDelete: (widget: Widget) => void;
}

export function WidgetsTable({
	widgets,
	runs,
	onView,
	onEdit,
	onDelete,
}: WidgetsTableProps) {
	const columns: TableColumn<Widget>[] = [
		{
			key: 'name',
			label: 'Name',
			render: (widget) => <span className="font-medium">{widget.name}</span>,
		},
		{
			key: 'type',
			label: 'Graph type',
			render: (widget) => {
				const type = WIDGET_TYPES.find((type) => type.value === widget.type);

				if (!type) return widget.type;

				const Icon = type.icon;

				return (
					<div className="flex items-center gap-2">
						<Icon className="size-[1em] shrink-0 text-muted" />
						{type.label}
					</div>
				);
			},
		},
		{
			key: 'run',
			label: 'Segmentation run',
			render: (widget) =>
				runs.find((run) => run.run_id === widget.run_id)?.name ?? 'Unknown run',
		},
		{
			key: 'actions',
			label: 'Actions',
			render: (widget) => (
				<div className="flex items-center gap-2">
					<Button
						appearance="subtle"
						size="sm"
						compact
						icon={Eye}
						aria-label={`View ${widget.name}`}
						onClick={() => onView(widget)}
					/>

					<Button
						appearance="subtle"
						size="sm"
						compact
						icon={Pencil}
						aria-label={`Edit ${widget.name}`}
						onClick={() => onEdit(widget)}
					/>

					<Button
						appearance="subtle"
						size="sm"
						compact
						icon={Trash2}
						aria-label={`Delete ${widget.name}`}
						onClick={() => onDelete(widget)}
					/>
				</div>
			),
		},
	];

	return (
		<Table
			columns={columns}
			rows={widgets}
			getRowKey={(widget) => widget.widget_id}
			emptyMessage="No widgets found."
		/>
	);
}
