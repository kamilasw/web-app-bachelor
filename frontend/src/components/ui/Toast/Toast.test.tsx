import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { Toast } from './Toast';

describe('Toast', () => {
	it('renders the title and description', () => {
		render(
			<Toast
				title="Notification"
				description="Additional information."
				onDismiss={vi.fn()}
			/>,
		);

		const toast = screen.getByRole('status');

		expect(toast).toHaveTextContent('Notification');
		expect(toast).toHaveTextContent('Additional information.');
	});

	it('renders without a description', () => {
		render(<Toast title="Notification" onDismiss={vi.fn()} />);

		expect(screen.getByRole('status')).toHaveTextContent('Notification');
	});

	it('renders a success notification', () => {
		render(
			<Toast
				title="Operation successful"
				appearance="success"
				onDismiss={vi.fn()}
			/>,
		);

		expect(screen.getByRole('status')).toHaveTextContent(
			'Operation successful',
		);
	});

	it('renders an error notification as an alert', () => {
		render(
			<Toast title="Operation failed" appearance="error" onDismiss={vi.fn()} />,
		);

		expect(screen.getByRole('alert')).toHaveTextContent('Operation failed');
	});

	it('calls onDismiss when the dismiss button is clicked', async () => {
		const user = userEvent.setup();
		const onDismiss = vi.fn();

		render(<Toast title="Notification" onDismiss={onDismiss} />);

		await user.click(
			screen.getByRole('button', {
				name: 'Dismiss notification',
			}),
		);

		expect(onDismiss).toHaveBeenCalledOnce();
	});
});
