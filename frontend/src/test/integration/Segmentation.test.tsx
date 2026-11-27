import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Segmentation } from '../../pages/Segmentation/Segmentation';

import { runs } from '../../mocks/runs';
import { algorithms } from '../../mocks/algorithms';

import type { SegmentationRequest } from '../../types/segmentation';

vi.mock(
	'../../components/segmentation/SegmentationRequestModal/SegmentationRequestModal',
	() => ({
		SegmentationRequestModal: ({
			onClose,
			onSubmit,
		}: {
			onClose: () => void;
			onSubmit: (request: SegmentationRequest) => void;
		}) => (
			<div role="dialog" aria-label="New segmentation request">
				<button
					onClick={() =>
						onSubmit({
							name: 'New test run',
							algorithm: 'kmeans',
							parameters: {
								n_clusters: 3,
							},
						})
					}
				>
					Submit request
				</button>

				<button onClick={onClose}>Cancel</button>
			</div>
		),
	}),
);

describe('Segmentation', () => {
	it('renders the existing segmentation runs', () => {
		render(<Segmentation />);

		expect(
			screen.getByRole('heading', {
				name: 'Your Segmentation Runs',
			}),
		).toBeInTheDocument();

		for (const run of runs) {
			expect(screen.getByText(run.name)).toBeInTheDocument();
		}

		expect(
			screen.getByText(`${runs.length} of ${runs.length} runs`),
		).toBeInTheDocument();
	});

	it('searches runs by name regardless of case', async () => {
		const user = userEvent.setup();

		render(<Segmentation />);

		await user.type(
			screen.getByLabelText(/^Search runs/),
			runs[0].name.toUpperCase(),
		);

		expect(screen.getByText(runs[0].name)).toBeInTheDocument();

		expect(screen.queryByText(runs[1].name)).not.toBeInTheDocument();

		expect(screen.getByText(`1 of ${runs.length} runs`)).toBeInTheDocument();
	});

	it('searches runs by algorithm name', async () => {
		const user = userEvent.setup();

		render(<Segmentation />);

		const algorithm = algorithms.find((item) => item.id === runs[0].algorithm)!;

		const matchingRuns = runs.filter((run) => run.algorithm === algorithm.id);

		await user.type(screen.getByLabelText(/^Search runs/), algorithm.name);

		for (const run of runs) {
			if (run.algorithm === algorithm.id) {
				expect(screen.getByText(run.name)).toBeInTheDocument();
			} else {
				expect(screen.queryByText(run.name)).not.toBeInTheDocument();
			}
		}

		expect(
			screen.getByText(`${matchingRuns.length} of ${runs.length} runs`),
		).toBeInTheDocument();
	});

	it('displays no matching runs and restores them when search is cleared', async () => {
		const user = userEvent.setup();

		render(<Segmentation />);

		const search = screen.getByLabelText(/^Search runs/);

		await user.type(search, 'nonexistent-run');

		expect(screen.getByText(`0 of ${runs.length} runs`)).toBeInTheDocument();

		await user.clear(search);

		expect(
			screen.getByText(`${runs.length} of ${runs.length} runs`),
		).toBeInTheDocument();
	});

	it('opens and cancels a segmentation request', async () => {
		const user = userEvent.setup();

		render(<Segmentation />);

		await user.click(screen.getByRole('button', { name: 'New request' }));

		const dialog = await screen.findByRole('dialog');

		await user.click(within(dialog).getByRole('button', { name: 'Cancel' }));

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

		expect(
			screen.getByText(`${runs.length} of ${runs.length} runs`),
		).toBeInTheDocument();
	});

	it('creates a segmentation run and displays a notification', async () => {
		const user = userEvent.setup();

		render(<Segmentation />);

		await user.click(screen.getByRole('button', { name: 'New request' }));

		const dialog = await screen.findByRole('dialog');

		await user.click(
			within(dialog).getByRole('button', {
				name: 'Submit request',
			}),
		);

		expect(await screen.findByText('New test run')).toBeInTheDocument();

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

		expect(
			screen.getByText(`${runs.length + 1} of ${runs.length + 1} runs`),
		).toBeInTheDocument();

		expect(await screen.findByRole('status')).toHaveTextContent(
			'Mock run created',
		);
	});

	it('displays feedback when viewing unavailable results', async () => {
		const user = userEvent.setup();

		render(<Segmentation />);

		const row = screen.getByRole('row', {
			name: new RegExp(runs[0].name),
		});

		await user.click(within(row).getByRole('button', { name: /view/i }));

		const toast = await screen.findByRole('status');

		expect(toast).toHaveTextContent('Results unavailable');
		expect(toast).toHaveTextContent(runs[0].name);
	});

	it('displays feedback when downloading unavailable results', async () => {
		const user = userEvent.setup();

		render(<Segmentation />);

		const row = screen.getByRole('row', {
			name: new RegExp(runs[0].name),
		});

		await user.click(within(row).getByRole('button', { name: /download/i }));

		expect(await screen.findByRole('status')).toHaveTextContent(
			'Download unavailable',
		);
	});
});
