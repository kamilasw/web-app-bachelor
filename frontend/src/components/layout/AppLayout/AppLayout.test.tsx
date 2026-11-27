import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { AppLayout } from './AppLayout';
import { APP_NAME } from '../../../constants/app';

function renderLayout(initialPath = '/') {
	return render(
		<MemoryRouter initialEntries={[initialPath]}>
			<Routes>
				<Route element={<AppLayout />}>
					<Route index element={<h1>Home page</h1>} />
					<Route path="segmentation" element={<h1>Segmentation page</h1>} />
					<Route path="dashboards" element={<h1>Dashboards page</h1>} />
					<Route path="widgets" element={<h1>Widgets page</h1>} />
					<Route path="assistant" element={<h1>Assistant page</h1>} />
					<Route path="settings" element={<h1>Settings page</h1>} />
				</Route>
			</Routes>
		</MemoryRouter>,
	);
}

describe('AppLayout', () => {
	it('renders the application name and nested route', () => {
		renderLayout();

		expect(screen.getByText(APP_NAME)).toBeInTheDocument();

		expect(
			screen.getByRole('heading', { name: 'Home page' }),
		).toBeInTheDocument();

		expect(screen.getByText('Client')).toBeInTheDocument();
	});

	it('renders the main navigation links', () => {
		renderLayout();

		expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
			'href',
			'/',
		);

		expect(screen.getByRole('link', { name: 'Segmentation' })).toHaveAttribute(
			'href',
			'/segmentation',
		);

		expect(screen.getByRole('link', { name: 'Dashboards' })).toHaveAttribute(
			'href',
			'/dashboards',
		);

		expect(screen.getByRole('link', { name: 'Widgets' })).toHaveAttribute(
			'href',
			'/widgets',
		);

		expect(screen.getByRole('link', { name: 'AI Assistant' })).toHaveAttribute(
			'href',
			'/assistant',
		);
	});

	it('navigates between pages using the sidebar', async () => {
		const user = userEvent.setup();

		renderLayout();

		await user.click(screen.getByRole('link', { name: 'Widgets' }));

		expect(
			await screen.findByRole('heading', {
				name: 'Widgets page',
			}),
		).toBeInTheDocument();

		expect(
			screen.queryByRole('heading', { name: 'Home page' }),
		).not.toBeInTheDocument();
	});

	it('renders the correct active route', () => {
		renderLayout('/segmentation');

		expect(
			screen.getByRole('heading', {
				name: 'Segmentation page',
			}),
		).toBeInTheDocument();

		expect(screen.getByRole('link', { name: 'Segmentation' })).toHaveAttribute(
			'aria-current',
			'page',
		);

		expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute(
			'aria-current',
			'page',
		);
	});

	it('navigates to settings using the sidebar button', async () => {
		const user = userEvent.setup();

		renderLayout();

		await user.click(screen.getByRole('button', { name: 'Settings' }));

		expect(
			await screen.findByRole('heading', {
				name: 'Settings page',
			}),
		).toBeInTheDocument();
	});

	it('navigates to settings using the header avatar', async () => {
		const user = userEvent.setup();

		renderLayout();

		await user.click(screen.getByRole('button', { name: 'Client' }));

		expect(
			await screen.findByRole('heading', {
				name: 'Settings page',
			}),
		).toBeInTheDocument();
	});
});
