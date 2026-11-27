import { useState } from 'react';
import type { SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

import { Button } from '../../components/ui/Button/Button';
import { Card } from '../../components/ui/Card/Card';
import { Input } from '../../components/ui/Input/Input';
import { Toast } from '../../components/ui/Toast/Toast';
import type { ToastProps } from '../../components/ui/Toast/Toast';

export function Settings() {
	const navigate = useNavigate();

	const [name, setName] = useState('Client');
	const [passwordError, setPasswordError] = useState('');

	const [toast, setToast] = useState<Omit<ToastProps, 'onDismiss'> | null>(
		null,
	);

	const handleNameSubmit = (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();

		// todo: update client backend

		setToast({
			title: 'Changes saved',
			description: 'Your name has been updated locally.',
			appearance: 'success',
		});
	};

	const handlePasswordSubmit = (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);

		if (formData.get('newPassword') !== formData.get('confirmPassword')) {
			setPasswordError('Passwords do not match.');
			return;
		}

		setPasswordError('');

		// todo: update passowrd

		setToast({
			title: 'Validation successful',
			description: 'Your new password passes frontend validation.',
			appearance: 'success',
		});

		form.reset();
	};

	const handleLogout = () => {
		// todo: sign out in backend
		navigate('/login', { replace: true });
	};

	return (
		<div className="mx-auto flex max-w-4xl flex-col gap-6">
			<div>
				<h1 className="text-2xl font-semibold">Account settings</h1>
			</div>

			<Card className="flex flex-col gap-4">
				<div>
					<h2 className="text-lg font-semibold">Personal information</h2>
				</div>

				<div className="border-t border-default" />

				<form onSubmit={handleNameSubmit} className="flex flex-col gap-4">
					<div className="w-full max-w-md">
						<Input
							label="Name"
							name="name"
							value={name}
							onChange={(event) => setName(event.target.value)}
							autoComplete="name"
							required
						/>
					</div>

					<div className="flex justify-end">
						<Button appearance="primary" type="submit">
							Save changes
						</Button>
					</div>
				</form>
			</Card>

			<Card className="flex flex-col gap-4">
				<div>
					<h2 className="text-lg font-semibold">Security</h2>
					<p className="text-sm text-muted">Change your account password.</p>
				</div>

				<div className="border-t border-default" />

				<form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
					<div className="flex w-full max-w-md flex-col gap-4">
						<Input
							label="Current password"
							name="currentPassword"
							type="password"
							autoComplete="current-password"
							required
						/>

						<Input
							label="New password"
							name="newPassword"
							type="password"
							autoComplete="new-password"
							minLength={8}
							hint="Use at least 8 characters."
							onChange={() => setPasswordError('')}
							required
						/>

						<Input
							label="Confirm new password"
							name="confirmPassword"
							type="password"
							autoComplete="new-password"
							error={passwordError || undefined}
							onChange={() => setPasswordError('')}
							required
						/>
					</div>

					<div className="flex justify-end">
						<Button appearance="primary" type="submit">
							Change password
						</Button>
					</div>
				</form>
			</Card>

			<Card className="flex flex-col gap-4">
				<div className="flex flex-wrap items-center justify-between gap-4">
					<p className="text-sm text-muted">Log out of your account.</p>

					<Button appearance="default" icon={LogOut} onClick={handleLogout}>
						Log out
					</Button>
				</div>
			</Card>

			{toast && <Toast {...toast} onDismiss={() => setToast(null)} />}
		</div>
	);
}
