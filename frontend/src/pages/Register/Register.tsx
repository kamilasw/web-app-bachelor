import { useState } from 'react';
import type { SubmitEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../../components/ui/Button/Button';
import { Card } from '../../components/ui/Card/Card';
import { Input } from '../../components/ui/Input/Input';

export function Register() {
	const navigate = useNavigate();
	const [passwordError, setPasswordError] = useState('');

	const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		if (formData.get('password') !== formData.get('confirmPassword')) {
			setPasswordError('Passwords do not match.');
			return;
		}

		// todo: add backend connection
		navigate('/login');
	};

	return (
		<Card className="flex flex-col gap-6">
			<div className="text-center">
				<h1 className="text-xl font-semibold">Create an account</h1>
			</div>

			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<Input label="Name" name="name" autoComplete="name" required />

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
					autoComplete="new-password"
					minLength={8}
					hint="Use at least 8 characters."
					onChange={() => setPasswordError('')}
					required
				/>

				<Input
					label="Confirm password"
					name="confirmPassword"
					type="password"
					autoComplete="new-password"
					error={passwordError || undefined}
					onChange={() => setPasswordError('')}
					required
				/>

				<Button appearance="primary" type="submit" className="w-full">
					Register
				</Button>
			</form>

			<p className="text-center text-sm text-muted">
				Already have an account?{' '}
				<Link to="/login" className="font-medium text-primary hover:underline">
					Log in
				</Link>
			</p>
		</Card>
	);
}
