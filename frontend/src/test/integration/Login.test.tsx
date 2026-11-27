import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { Login } from '../../pages/Login/Login';

function renderLogin() {
	return render(
		<MemoryRouter initialEntries={['/login']}>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<h1>Home page</h1>} />
				<Route path="/register" element={<h1>Registration page</h1>} />
			</Routes>
		</MemoryRouter>,
	);
}

describe('Login', () => {
	it('renders the required login fields', () => {
		renderLogin();

		expect(screen.getByRole('heading', { name: 'Log in' })).toBeInTheDocument();

		expect(screen.getByLabelText(/^Email/)).toBeRequired();
		expect(screen.getByLabelText(/^Password/)).toBeRequired();

		expect(screen.getByLabelText(/^Password/)).toHaveAttribute(
			'type',
			'password',
		);
	});

	it('prevents submission of an empty form', async () => {
		const user = userEvent.setup();

		renderLogin();

		await user.click(screen.getByRole('button', { name: 'Log in' }));

		expect(screen.getByLabelText(/^Email/)).toBeInvalid();
		expect(screen.getByLabelText(/^Password/)).toBeInvalid();

		expect(
			screen.queryByRole('heading', { name: 'Home page' }),
		).not.toBeInTheDocument();
	});

	it('prevents submission with an invalid email address', async () => {
		const user = userEvent.setup();

		renderLogin();

		await user.type(screen.getByLabelText(/^Email/), 'invalid-email');

		await user.type(screen.getByLabelText(/^Password/), 'Password123');

		await user.click(screen.getByRole('button', { name: 'Log in' }));

		expect(screen.getByLabelText(/^Email/)).toBeInvalid();

		expect(
			screen.queryByRole('heading', { name: 'Home page' }),
		).not.toBeInTheDocument();
	});

	it('navigates to the homepage after valid form submission', async () => {
		const user = userEvent.setup();

		renderLogin();

		await user.type(screen.getByLabelText(/^Email/), 'user@example.com');

		await user.type(screen.getByLabelText(/^Password/), 'Password123');

		await user.click(screen.getByRole('button', { name: 'Log in' }));

		expect(
			await screen.findByRole('heading', { name: 'Home page' }),
		).toBeInTheDocument();
	});

	it('navigates to the registration page', async () => {
		const user = userEvent.setup();

		renderLogin();

		await user.click(screen.getByRole('link', { name: 'Register' }));

		expect(
			await screen.findByRole('heading', {
				name: 'Registration page',
			}),
		).toBeInTheDocument();
	});
});
