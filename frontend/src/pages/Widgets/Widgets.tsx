import { useState } from 'react';
import { Plus, X } from 'lucide-react';

import { Button } from '../../components/ui/Button/Button';
import { Card } from '../../components/ui/Card/Card';
import { Input } from '../../components/ui/Input/Input';
import { Select } from '../../components/ui/Select/Select';

import { WidgetsTable } from '../../components/widgets/WidgetsTable/WidgetsTable';

import { WIDGET_TYPES } from '../../constants/widgets';

import { widgets as mockWidgets } from '../../mocks/widgets';
import { runs } from '../../mocks/runs';

import type { Widget } from '../../types/widget';

export function Widgets() {
	const [widgets, setWidgets] = useState(mockWidgets);

	const [search, setSearch] = useState('');
	const [typeFilter, setTypeFilter] = useState('');
	const [runFilter, setRunFilter] = useState('');

	const filteredWidgets = widgets.filter((widget) => {
		const matchesName = widget.name
			.toLowerCase()
			.includes(search.trim().toLowerCase());

		const matchesType = !typeFilter || widget.type === typeFilter;

		const matchesRun = !runFilter || widget.run_id === runFilter;

		return matchesName && matchesType && matchesRun;
	});

	const hasFilters = Boolean(search || typeFilter || runFilter);

	const handleClearFilters = () => {
		setSearch('');
		setTypeFilter('');
		setRunFilter('');
	};

	const handleCreate = () => {
		//todo - widget creation modal
	};

	const handleView = (widget: Widget) => {
		//todo - widget preview
		console.log(widget);
	};

	const handleEdit = (widget: Widget) => {
		//todo- widget edit
		console.log(widget);
	};

	const handleDelete = (widget: Widget) => {
		//todo - deletion
		setWidgets((previous) =>
			previous.filter((item) => item.widget_id !== widget.widget_id),
		);
	};

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-semibold">Your Custom Widgets</h1>
				</div>

				<Button appearance="primary" icon={Plus} onClick={handleCreate}>
					New widget
				</Button>
			</div>

			<Card className="flex flex-col gap-4">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<Input
						label="Search"
						placeholder="Search by widget name"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
					/>

					<Select
						label="Graph type"
						value={typeFilter}
						options={[
							{ value: '', label: 'All types' },
							...WIDGET_TYPES.map((type) => ({
								value: type.value,
								label: type.label,
							})),
						]}
						onChange={(event) => setTypeFilter(event.target.value)}
					/>

					<Select
						label="Segmentation run"
						value={runFilter}
						options={[
							{ value: '', label: 'All runs' },
							...runs.map((run) => ({
								value: run.run_id,
								label: run.name,
							})),
						]}
						onChange={(event) => setRunFilter(event.target.value)}
					/>
				</div>

				<div className="flex items-center justify-between">
					<p className="text-sm text-muted">
						{filteredWidgets.length} of {widgets.length} widgets
					</p>

					{hasFilters && (
						<Button
							appearance="subtle"
							size="sm"
							compact
							icon={X}
							onClick={handleClearFilters}
						>
							Clear filters
						</Button>
					)}
				</div>

				<WidgetsTable
					widgets={filteredWidgets}
					runs={runs}
					onView={handleView}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			</Card>
		</div>
	);
}
