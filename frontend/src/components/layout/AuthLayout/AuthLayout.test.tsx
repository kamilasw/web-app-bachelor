import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { AuthLayout } from './AuthLayout';
import { APP_NAME } from '../../../constants/app';

describe('AuthLayout', () => {
	it('renders the application name and nested route', () => {
		render(
			<MemoryRouter initialEntries={['/login']}>
				<Routes>
					<Route element={<AuthLayout />}>
						<Route path="login" element={<h1>Login</h1>} />
					</Route>
				</Routes>
			</MemoryRouter>,
		);

		expect(screen.getByText(APP_NAME)).toBeInTheDocument();

		expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
	});

	it('renders different authentication routes', () => {
		render(
			<MemoryRouter initialEntries={['/register']}>
				<Routes>
					<Route element={<AuthLayout />}>
						<Route path="register" element={<h1>Register</h1>} />
					</Route>
				</Routes>
			</MemoryRouter>,
		);

		expect(
			screen.getByRole('heading', { name: 'Register' }),
		).toBeInTheDocument();
	});

	it('does not render application navigation', () => {
		render(
			<MemoryRouter>
				<AuthLayout />
			</MemoryRouter>,
		);

		expect(screen.queryByRole('navigation')).not.toBeInTheDocument();

		expect(
			screen.queryByRole('button', { name: 'Settings' }),
		).not.toBeInTheDocument();
	});
});
