import { useState } from 'react';
import { Plus, X } from 'lucide-react';

import { Button } from '../../components/ui/Button/Button';
import { Card } from '../../components/ui/Card/Card';
import { Input } from '../../components/ui/Input/Input';
import { Select } from '../../components/ui/Select/Select';

import { WidgetsTable } from '../../components/widgets/WidgetsTable/WidgetsTable';
import { WidgetPreviewModal } from '../../components/widgets/WidgetPreviewModal/WidgetPreviewModal';
import { WidgetFormModal } from '../../components/widgets/WidgetFormModal/WidgetFormModal';

import { WIDGET_TYPES } from '../../constants/widgets';

import { widgets as mockWidgets } from '../../mocks/widgets';
import { runs } from '../../mocks/runs';
import { segmentationResults } from '../../mocks/results';
import { userData } from '../../mocks/userData';

import type { Widget, WidgetFormData } from '../../types/widget';

import { Modal } from '../../components/ui/Modal/Modal';
import { Toast } from '../../components/ui/Toast/Toast';
import type { ToastProps } from '../../components/ui/Toast/Toast';

export function Widgets() {
	const [widgets, setWidgets] = useState(mockWidgets);

	const [search, setSearch] = useState('');
	const [typeFilter, setTypeFilter] = useState('');
	const [runFilter, setRunFilter] = useState('');

	const [formOpen, setFormOpen] = useState(false);
	const [widgetToEdit, setWidgetToEdit] = useState<Widget | null>(null);
	const [widgetToView, setWidgetToView] = useState<Widget | null>(null);

	const [widgetToDelete, setWidgetToDelete] = useState<Widget | null>(null);

	const [toast, setToast] = useState<Omit<ToastProps, 'onDismiss'> | null>(
		null,
	);

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

	// Widget actions
	const handleCreate = () => {
		setWidgetToEdit(null);
		setFormOpen(true);
	};

	const handleView = (widget: Widget) => {
		setWidgetToView(widget);
	};

	const handleEdit = (widget: Widget) => {
		setWidgetToEdit(widget);
		setFormOpen(true);
	};

	const handleCloseForm = () => {
		setFormOpen(false);
		setWidgetToEdit(null);
	};

	const handleSave = (data: WidgetFormData) => {
		if (widgetToEdit) {
			// todo: Update widget in Supabase.
			setWidgets((previous) =>
				previous.map((widget) =>
					widget.widget_id === widgetToEdit.widget_id
						? { ...widget, ...data }
						: widget,
				),
			);

			setToast({
				title: 'Widget updated',
				description: `"${data.name}" has been updated.`,
				appearance: 'success',
			});
		} else {
			const run = runs.find((run) => run.run_id === data.run_id);

			if (!run) return;

			const newWidget: Widget = {
				widget_id: crypto.randomUUID(),
				client_id: run.client_id,
				...data,
			};

			// todo: Insert widget into Supabase.
			setWidgets((previous) => [...previous, newWidget]);

			setToast({
				title: 'Widget created',
				description: `"${data.name}" has been created.`,
				appearance: 'success',
			});
		}

		handleCloseForm();
	};

	const handleDelete = (widget: Widget) => {
		setWidgetToDelete(widget);
	};

	const handleConfirmDelete = () => {
		if (!widgetToDelete) return;

		// TODO: Delete widget from Supabase.
		setWidgets((previous) =>
			previous.filter(
				(widget) => widget.widget_id !== widgetToDelete.widget_id,
			),
		);

		setToast({
			title: 'Widget deleted',
			description: `"${widgetToDelete.name}" has been deleted.`,
			appearance: 'success',
		});

		setWidgetToDelete(null);
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

			{formOpen && (
				<WidgetFormModal
					widget={widgetToEdit ?? undefined}
					runs={runs}
					results={segmentationResults}
					onClose={handleCloseForm}
					onSubmit={handleSave}
				/>
			)}

			{widgetToView && (
				<WidgetPreviewModal
					widget={widgetToView}
					result={segmentationResults[widgetToView.run_id]}
					userData={userData}
					onClose={() => setWidgetToView(null)}
				/>
			)}

			{widgetToDelete && (
				<Modal
					open
					title="Delete widget"
					onClose={() => setWidgetToDelete(null)}
					footer={
						<>
							<Button
								appearance="default"
								onClick={() => setWidgetToDelete(null)}
							>
								Cancel
							</Button>

							<Button appearance="danger" onClick={handleConfirmDelete}>
								Delete
							</Button>
						</>
					}
				>
					<p>
						Are you sure you want to delete{' '}
						<strong>{widgetToDelete.name}</strong>? This action cannot be
						undone.
					</p>
				</Modal>
			)}

			{toast && <Toast {...toast} onDismiss={() => setToast(null)} />}
		</div>
	);
}
