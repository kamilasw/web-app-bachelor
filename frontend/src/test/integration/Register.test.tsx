import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { Register } from '../../pages/Register/Register';

function renderRegister() {
	return render(
		<MemoryRouter initialEntries={['/register']}>
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<h1>Login page</h1>} />
			</Routes>
		</MemoryRouter>,
	);
}

async function fillForm(
	user: ReturnType<typeof userEvent.setup>,
	password = 'Password123',
	confirmPassword = 'Password123',
) {
	await user.type(screen.getByLabelText(/^Name/), 'Example User');

	await user.type(screen.getByLabelText(/^Email/), 'user@example.com');

	await user.type(screen.getByLabelText(/^Password/), password);

	await user.type(screen.getByLabelText(/^Confirm password/), confirmPassword);
}

describe('Register', () => {
	it('renders the required registration fields', () => {
		renderRegister();

		expect(
			screen.getByRole('heading', { name: 'Create an account' }),
		).toBeInTheDocument();

		expect(screen.getByLabelText(/^Name/)).toBeRequired();
		expect(screen.getByLabelText(/^Email/)).toBeRequired();
		expect(screen.getByLabelText(/^Password/)).toBeRequired();
		expect(screen.getByLabelText(/^Confirm password/)).toBeRequired();

		expect(screen.getByLabelText(/^Password/)).toHaveAttribute(
			'minlength',
			'8',
		);
	});

	it('prevents submission of an empty form', async () => {
		const user = userEvent.setup();

		renderRegister();

		await user.click(screen.getByRole('button', { name: 'Register' }));

		expect(screen.getByLabelText(/^Name/)).toBeInvalid();
		expect(screen.getByLabelText(/^Email/)).toBeInvalid();

		expect(
			screen.queryByRole('heading', { name: 'Login page' }),
		).not.toBeInTheDocument();
	});

	it('displays an error when passwords do not match', async () => {
		const user = userEvent.setup();

		renderRegister();

		await fillForm(user, 'Password123', 'DifferentPassword');

		await user.click(screen.getByRole('button', { name: 'Register' }));

		expect(
			await screen.findByText('Passwords do not match.'),
		).toBeInTheDocument();

		expect(screen.getByLabelText(/^Confirm password/)).toHaveAttribute(
			'aria-invalid',
			'true',
		);

		expect(
			screen.queryByRole('heading', { name: 'Login page' }),
		).not.toBeInTheDocument();
	});

	it.each([
		['Password', /^Password/],
		['Confirm password', /^Confirm password/],
	] as const)('clears the password error when %s changes', async (_, label) => {
		const user = userEvent.setup();

		renderRegister();

		await fillForm(user, 'Password123', 'DifferentPassword');

		await user.click(screen.getByRole('button', { name: 'Register' }));

		expect(
			await screen.findByText('Passwords do not match.'),
		).toBeInTheDocument();

		await user.type(screen.getByLabelText(label), 'A');

		expect(
			screen.queryByText('Passwords do not match.'),
		).not.toBeInTheDocument();
	});

	it('navigates to login after valid registration submission', async () => {
		const user = userEvent.setup();

		renderRegister();

		await fillForm(user);

		await user.click(screen.getByRole('button', { name: 'Register' }));

		expect(
			await screen.findByRole('heading', { name: 'Login page' }),
		).toBeInTheDocument();
	});

	it('navigates to login using the existing account link', async () => {
		const user = userEvent.setup();

		renderRegister();

		await user.click(screen.getByRole('link', { name: 'Log in' }));

		expect(
			await screen.findByRole('heading', { name: 'Login page' }),
		).toBeInTheDocument();
	});
});
