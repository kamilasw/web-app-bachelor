import type { SubmitEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../../components/ui/Button/Button';
import { Card } from '../../components/ui/Card/Card';
import { Input } from '../../components/ui/Input/Input';

export function Login() {
	const navigate = useNavigate();

	const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();

		// to do: add connection to backend
		navigate('/');
	};

	return (
		<Card className="flex flex-col gap-6">
			<div className="text-center">
				<h1 className="text-xl font-semibold">Log in</h1>
			</div>

			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<Input
					label="Email"
					name="email"
					type="email"
					autoComplete="email"
					required
				/>

				<Input
					label="Password"
					name="password"
					type="password"
					autoComplete="current-password"
					required
				/>

				<Button appearance="primary" type="submit" className="w-full">
					Log in
				</Button>
			</form>

			<p className="text-center text-sm text-muted">
				Don't have an account?{' '}
				<Link
					to="/register"
					className="font-medium text-primary hover:underline"
				>
					Register
				</Link>
			</p>
		</Card>
	);
}
