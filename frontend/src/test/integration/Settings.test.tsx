import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { Settings } from '../../pages/Settings/Settings';

function renderSettings() {
	return render(
		<MemoryRouter initialEntries={['/settings']}>
			<Routes>
				<Route path="/settings" element={<Settings />} />
				<Route path="/login" element={<h1>Login page</h1>} />
			</Routes>
		</MemoryRouter>,
	);
}

async function fillPasswords(
	user: ReturnType<typeof userEvent.setup>,
	password = 'NewPassword123',
	confirmation = 'NewPassword123',
) {
	await user.type(screen.getByLabelText(/^Current password/), 'OldPassword123');

	await user.type(screen.getByLabelText(/^New password/), password);

	await user.type(screen.getByLabelText(/^Confirm new password/), confirmation);
}

describe('Settings', () => {
	it('renders account settings and the current name', () => {
		renderSettings();

		expect(
			screen.getByRole('heading', { name: 'Account settings' }),
		).toBeInTheDocument();

		expect(
			screen.getByRole('heading', { name: 'Personal information' }),
		).toBeInTheDocument();

		expect(
			screen.getByRole('heading', { name: 'Security' }),
		).toBeInTheDocument();

		expect(screen.getByLabelText(/^Name/)).toHaveValue('Client');
	});

	it('updates the name and displays a notification', async () => {
		const user = userEvent.setup();

		renderSettings();

		const name = screen.getByLabelText(/^Name/);

		await user.clear(name);
		await user.type(name, 'Example User');

		await user.click(screen.getByRole('button', { name: 'Save changes' }));

		expect(name).toHaveValue('Example User');

		expect(await screen.findByRole('status')).toHaveTextContent(
			'Changes saved',
		);
	});

	it('prevents saving an empty name', async () => {
		const user = userEvent.setup();

		renderSettings();

		const name = screen.getByLabelText(/^Name/);

		await user.clear(name);

		await user.click(screen.getByRole('button', { name: 'Save changes' }));

		expect(name).toBeRequired();
		expect(name).toBeInvalid();
		expect(screen.queryByRole('status')).not.toBeInTheDocument();
	});

	it('prevents submission of empty password fields', async () => {
		const user = userEvent.setup();

		renderSettings();

		await user.click(screen.getByRole('button', { name: 'Change password' }));

		for (const label of [
			/^Current password/,
			/^New password/,
			/^Confirm new password/,
		]) {
			const input = screen.getByLabelText(label);

			expect(input).toBeRequired();
			expect(input).toBeInvalid();
		}

		expect(screen.queryByRole('status')).not.toBeInTheDocument();
	});

	it('displays an error when passwords do not match', async () => {
		const user = userEvent.setup();

		renderSettings();

		await fillPasswords(user, 'NewPassword123', 'DifferentPassword');

		await user.click(screen.getByRole('button', { name: 'Change password' }));

		expect(
			await screen.findByText('Passwords do not match.'),
		).toBeInTheDocument();

		expect(screen.getByLabelText(/^Confirm new password/)).toHaveAttribute(
			'aria-invalid',
			'true',
		);

		expect(screen.queryByRole('status')).not.toBeInTheDocument();
	});

	it.each([
		['new password', /^New password/],
		['confirmation', /^Confirm new password/],
	] as const)(
		'clears the validation error when the %s changes',
		async (_, label) => {
			const user = userEvent.setup();

			renderSettings();

			await fillPasswords(user, 'NewPassword123', 'DifferentPassword');

			await user.click(screen.getByRole('button', { name: 'Change password' }));

			expect(
				await screen.findByText('Passwords do not match.'),
			).toBeInTheDocument();

			await user.type(screen.getByLabelText(label), 'A');

			expect(
				screen.queryByText('Passwords do not match.'),
			).not.toBeInTheDocument();
		},
	);

	it('validates matching passwords and resets the form', async () => {
		const user = userEvent.setup();

		renderSettings();

		await fillPasswords(user);

		await user.click(screen.getByRole('button', { name: 'Change password' }));

		expect(await screen.findByRole('status')).toHaveTextContent(
			'Validation successful',
		);

		for (const label of [
			/^Current password/,
			/^New password/,
			/^Confirm new password/,
		]) {
			expect(screen.getByLabelText(label)).toHaveValue('');
		}
	});

	it('dismisses the notification', async () => {
		const user = userEvent.setup();

		renderSettings();

		await user.click(screen.getByRole('button', { name: 'Save changes' }));

		expect(await screen.findByRole('status')).toBeInTheDocument();

		await user.click(
			screen.getByRole('button', {
				name: 'Dismiss notification',
			}),
		);

		expect(screen.queryByRole('status')).not.toBeInTheDocument();
	});

	it('navigates to login when logging out', async () => {
		const user = userEvent.setup();

		renderSettings();

		await user.click(screen.getByRole('button', { name: 'Log out' }));

		expect(
			await screen.findByRole('heading', { name: 'Login page' }),
		).toBeInTheDocument();
	});
});
