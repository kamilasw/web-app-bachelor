import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
	it('renders with an accessible label', () => {
		render(<Checkbox label="Checkbox" />);

		expect(
			screen.getByRole('checkbox', { name: 'Checkbox' }),
		).toBeInTheDocument();
	});

	it('is unchecked by default', () => {
		render(<Checkbox label="Checkbox" />);

		expect(screen.getByRole('checkbox')).not.toBeChecked();
	});

	it('toggles when clicked', async () => {
		const user = userEvent.setup();

		render(<Checkbox label="Checkbox" />);

		const checkbox = screen.getByRole('checkbox');

		await user.click(checkbox);
		expect(checkbox).toBeChecked();

		await user.click(checkbox);
		expect(checkbox).not.toBeChecked();
	});

	it('toggles when its label is clicked', async () => {
		const user = userEvent.setup();

		render(<Checkbox label="Checkbox" />);

		await user.click(screen.getByText('Checkbox'));

		expect(screen.getByRole('checkbox')).toBeChecked();
	});

	it('calls onChange when toggled', async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();

		render(<Checkbox label="Checkbox" onChange={onChange} />);

		await user.click(screen.getByRole('checkbox'));

		expect(onChange).toHaveBeenCalledOnce();
	});

	it('supports a default checked state', () => {
		render(<Checkbox label="Checkbox" defaultChecked />);

		expect(screen.getByRole('checkbox')).toBeChecked();
	});

	it('supports controlled values', () => {
		const onChange = vi.fn();

		const { rerender } = render(
			<Checkbox label="Checkbox" checked={false} onChange={onChange} />,
		);

		expect(screen.getByRole('checkbox')).not.toBeChecked();

		rerender(<Checkbox label="Checkbox" checked={true} onChange={onChange} />);

		expect(screen.getByRole('checkbox')).toBeChecked();
	});

	it('prevents interaction when disabled', async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();

		render(<Checkbox label="Checkbox" disabled onChange={onChange} />);

		const checkbox = screen.getByRole('checkbox');

		expect(checkbox).toBeDisabled();

		await user.click(checkbox);

		expect(checkbox).not.toBeChecked();
		expect(onChange).not.toHaveBeenCalled();
	});

	it('supports required fields and native attributes', () => {
		render(
			<Checkbox label="Checkbox" required name="example" value="accepted" />,
		);

		const checkbox = screen.getByRole('checkbox');

		expect(checkbox).toBeRequired();
		expect(checkbox).toHaveAttribute('name', 'example');
		expect(checkbox).toHaveAttribute('value', 'accepted');
	});

	it('displays a required indicator when required', () => {
		render(<Checkbox label="Checkbox" required />);

		expect(screen.getByRole('checkbox')).toBeRequired();
		expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
	});
});
