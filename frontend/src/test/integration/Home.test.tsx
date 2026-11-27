import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { Home } from '../../pages/Home/Home';

function renderHome() {
	return render(
		<MemoryRouter initialEntries={['/']}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/segmentation" element={<h1>Segmentation page</h1>} />
				<Route path="/dashboards" element={<h1>Dashboards page</h1>} />
				<Route path="/widgets" element={<h1>Widgets page</h1>} />
				<Route path="/assistant" element={<h1>Assistant page</h1>} />
			</Routes>
		</MemoryRouter>,
	);
}

describe('Home', () => {
	it('renders the welcome message and workspace sections', () => {
		renderHome();

		expect(
			screen.getByRole('heading', { name: 'Welcome back, Client' }),
		).toBeInTheDocument();

		for (const name of [
			'Segmentation',
			'Dashboards',
			'Widgets',
			'AI Assistant',
		]) {
			expect(screen.getByRole('heading', { name })).toBeInTheDocument();
		}
	});

	it('renders the recent activity empty state', () => {
		renderHome();

		expect(
			screen.getByRole('heading', { name: 'Recent activity' }),
		).toBeInTheDocument();

		expect(screen.getByText('No recent activity')).toBeInTheDocument();
	});

	it('navigates to segmentation using the primary action', async () => {
		const user = userEvent.setup();

		renderHome();

		await user.click(screen.getByRole('button', { name: 'New Segmentation' }));

		expect(
			await screen.findByRole('heading', {
				name: 'Segmentation page',
			}),
		).toBeInTheDocument();
	});

	it.each([
		[0, 'Segmentation page'],
		[1, 'Dashboards page'],
		[2, 'Widgets page'],
	])('navigates from workspace button %i to %s', async (index, destination) => {
		const user = userEvent.setup();

		renderHome();

		await user.click(screen.getAllByRole('button', { name: 'View' })[index]);

		expect(
			await screen.findByRole('heading', { name: destination }),
		).toBeInTheDocument();
	});

	it('navigates to the AI assistant', async () => {
		const user = userEvent.setup();

		renderHome();

		await user.click(screen.getByRole('button', { name: 'Open assistant' }));

		expect(
			await screen.findByRole('heading', {
				name: 'Assistant page',
			}),
		).toBeInTheDocument();
	});
});
