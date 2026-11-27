import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Widgets } from '../../pages/Widgets/Widgets';

import { widgets } from '../../mocks/widgets';
import { runs } from '../../mocks/runs';

vi.mock('../../components/widgets/WidgetRenderer/WidgetRenderer', () => ({
	WidgetRenderer: () => <div>Chart preview</div>,
}));

function getWidgetRow(name: string) {
	return screen.getByRole('row', {
		name: new RegExp(name, 'i'),
	});
}

describe('Widgets', () => {
	it('renders the existing widgets', () => {
		render(<Widgets />);

		expect(
			screen.getByRole('heading', {
				name: 'Your Custom Widgets',
			}),
		).toBeInTheDocument();

		for (const widget of widgets) {
			expect(screen.getByText(widget.name)).toBeInTheDocument();
		}

		expect(
			screen.getByText(`${widgets.length} of ${widgets.length} widgets`),
		).toBeInTheDocument();
	});

	it('searches widgets by name regardless of case', async () => {
		const user = userEvent.setup();

		render(<Widgets />);

		await user.type(
			screen.getByLabelText(/^Search/),
			widgets[0].name.toUpperCase(),
		);

		expect(screen.getByText(widgets[0].name)).toBeInTheDocument();

		expect(screen.queryByText(widgets[1].name)).not.toBeInTheDocument();

		expect(
			screen.getByText(`1 of ${widgets.length} widgets`),
		).toBeInTheDocument();
	});

	it('filters widgets by graph type', async () => {
		const user = userEvent.setup();

		render(<Widgets />);

		await user.selectOptions(screen.getByLabelText(/^Graph type/), 'bar');

		const matchingWidgets = widgets.filter((widget) => widget.type === 'bar');

		for (const widget of widgets) {
			if (widget.type === 'bar') {
				expect(screen.getByText(widget.name)).toBeInTheDocument();
			} else {
				expect(screen.queryByText(widget.name)).not.toBeInTheDocument();
			}
		}

		expect(
			screen.getByText(
				`${matchingWidgets.length} of ${widgets.length} widgets`,
			),
		).toBeInTheDocument();
	});

	it('filters widgets by segmentation run', async () => {
		const user = userEvent.setup();

		render(<Widgets />);

		const runId = runs[0].run_id;

		await user.selectOptions(screen.getByLabelText(/^Segmentation run/), runId);

		const matchingWidgets = widgets.filter((widget) => widget.run_id === runId);

		for (const widget of widgets) {
			if (widget.run_id === runId) {
				expect(screen.getByText(widget.name)).toBeInTheDocument();
			} else {
				expect(screen.queryByText(widget.name)).not.toBeInTheDocument();
			}
		}

		expect(
			screen.getByText(
				`${matchingWidgets.length} of ${widgets.length} widgets`,
			),
		).toBeInTheDocument();
	});

	it('combines multiple filters', async () => {
		const user = userEvent.setup();

		render(<Widgets />);

		const widget = widgets[0];

		await user.type(screen.getByLabelText(/^Search/), widget.name);

		await user.selectOptions(screen.getByLabelText(/^Graph type/), widget.type);

		await user.selectOptions(
			screen.getByLabelText(/^Segmentation run/),
			widget.run_id,
		);

		expect(screen.getByText(widget.name)).toBeInTheDocument();

		expect(
			screen.getByText(`1 of ${widgets.length} widgets`),
		).toBeInTheDocument();

		const differentType = widget.type === 'bar' ? 'pie' : 'bar';

		await user.selectOptions(
			screen.getByLabelText(/^Graph type/),
			differentType,
		);

		expect(screen.queryByText(widget.name)).not.toBeInTheDocument();

		expect(
			screen.getByText(`0 of ${widgets.length} widgets`),
		).toBeInTheDocument();
	});

	it('clears all active filters', async () => {
		const user = userEvent.setup();

		render(<Widgets />);

		const search = screen.getByLabelText(/^Search/);
		const typeFilter = screen.getByLabelText(/^Graph type/);
		const runFilter = screen.getByLabelText(/^Segmentation run/);

		await user.type(search, 'nonexistent-widget');
		await user.selectOptions(typeFilter, 'bar');
		await user.selectOptions(runFilter, runs[0].run_id);

		expect(
			screen.getByText(`0 of ${widgets.length} widgets`),
		).toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: 'Clear filters' }));

		expect(search).toHaveValue('');
		expect(typeFilter).toHaveValue('');
		expect(runFilter).toHaveValue('');

		expect(
			screen.getByText(`${widgets.length} of ${widgets.length} widgets`),
		).toBeInTheDocument();

		expect(
			screen.queryByRole('button', { name: 'Clear filters' }),
		).not.toBeInTheDocument();
	});

	it('creates a new widget and displays a notification', async () => {
		const user = userEvent.setup();

		render(<Widgets />);

		await user.click(screen.getByRole('button', { name: 'New widget' }));

		const dialog = await screen.findByRole('dialog');

		await user.selectOptions(
			within(dialog).getByLabelText(/^Segmentation run/),
			runs[0].run_id,
		);

		await user.selectOptions(
			within(dialog).getByLabelText(/^Graph type/),
			'pie',
		);

		await user.type(
			within(dialog).getByLabelText(/^Widget name/),
			'New test widget',
		);

		expect(within(dialog).getByText('Chart preview')).toBeInTheDocument();

		await user.click(
			within(dialog).getByRole('button', {
				name: 'Create widget',
			}),
		);

		expect(
			await screen.findByRole('row', {
				name: /New test widget/,
			}),
		).toBeInTheDocument();

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

		expect(
			screen.getByText(
				`${widgets.length + 1} of ${widgets.length + 1} widgets`,
			),
		).toBeInTheDocument();

		expect(await screen.findByRole('status')).toHaveTextContent(
			'Widget created',
		);
	});

	it('cancels widget creation without modifying the list', async () => {
		const user = userEvent.setup();

		render(<Widgets />);

		await user.click(screen.getByRole('button', { name: 'New widget' }));

		const dialog = await screen.findByRole('dialog');

		await user.click(within(dialog).getByRole('button', { name: 'Cancel' }));

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

		expect(
			screen.getByText(`${widgets.length} of ${widgets.length} widgets`),
		).toBeInTheDocument();
	});

	it('edits an existing widget', async () => {
		const user = userEvent.setup();

		render(<Widgets />);

		const widget = widgets.find((widget) => widget.type === 'pie')!;

		await user.click(
			within(getWidgetRow(widget.name)).getByRole('button', {
				name: /edit/i,
			}),
		);

		const dialog = await screen.findByRole('dialog');

		const name = within(dialog).getByLabelText(/^Widget name/);

		expect(name).toHaveValue(widget.name);

		expect(within(dialog).getByLabelText(/^Segmentation run/)).toHaveValue(
			widget.run_id,
		);

		expect(within(dialog).getByLabelText(/^Graph type/)).toHaveValue(
			widget.type,
		);

		await user.clear(name);
		await user.type(name, 'Updated widget');

		await user.click(
			within(dialog).getByRole('button', {
				name: 'Save changes',
			}),
		);

		expect(
			await screen.findByRole('row', {
				name: /Updated widget/,
			}),
		).toBeInTheDocument();

		expect(
			screen.queryByRole('row', {
				name: new RegExp(widget.name, 'i'),
			}),
		).not.toBeInTheDocument();

		expect(
			screen.getByText(`${widgets.length} of ${widgets.length} widgets`),
		).toBeInTheDocument();

		expect(await screen.findByRole('status')).toHaveTextContent(
			'Widget updated',
		);
	});

	it('opens and closes a widget preview', async () => {
		const user = userEvent.setup();

		render(<Widgets />);

		const widget = widgets[0];

		await user.click(
			within(getWidgetRow(widget.name)).getByRole('button', {
				name: /view/i,
			}),
		);

		const dialog = await screen.findByRole('dialog');

		expect(within(dialog).getByText(widget.name)).toBeInTheDocument();

		expect(within(dialog).getByText('Chart preview')).toBeInTheDocument();

		await user.click(
			within(dialog).getByText('Close', {
				selector: 'button',
			}),
		);

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('cancels widget deletion', async () => {
		const user = userEvent.setup();

		render(<Widgets />);

		const widget = widgets[0];

		await user.click(
			within(getWidgetRow(widget.name)).getByRole('button', {
				name: /delete/i,
			}),
		);

		const dialog = await screen.findByRole('dialog');

		await user.click(
			within(dialog).getByRole('button', {
				name: 'Cancel',
			}),
		);

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

		expect(getWidgetRow(widget.name)).toBeInTheDocument();

		expect(
			screen.getByText(`${widgets.length} of ${widgets.length} widgets`),
		).toBeInTheDocument();
	});

	it('deletes a widget after confirmation and displays a notification', async () => {
		const user = userEvent.setup();

		render(<Widgets />);

		const widget = widgets[0];

		await user.click(
			within(getWidgetRow(widget.name)).getByRole('button', {
				name: /delete/i,
			}),
		);

		const dialog = await screen.findByRole('dialog');

		expect(dialog).toHaveTextContent(widget.name);

		await user.click(
			within(dialog).getByRole('button', {
				name: 'Delete',
			}),
		);

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

		expect(
			screen.queryByRole('row', {
				name: new RegExp(widget.name, 'i'),
			}),
		).not.toBeInTheDocument();

		expect(
			screen.getByText(
				`${widgets.length - 1} of ${widgets.length - 1} widgets`,
			),
		).toBeInTheDocument();

		expect(await screen.findByRole('status')).toHaveTextContent(
			'Widget deleted',
		);
	});
});
