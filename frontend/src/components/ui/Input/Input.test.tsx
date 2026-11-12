import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from './Input';

describe('Input', () => {
	describe('Rendering', () => {
		it('renders with an accessible label', () => {
			render(<Input label="Email" />);

			expect(
				screen.getByRole('textbox', { name: 'Email' }),
			).toBeInTheDocument();
		});

		it('uses text as the default input type', () => {
			render(<Input label="Username" />);

			expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
		});

		it('renders the placeholder', () => {
			render(<Input label="Email" placeholder="Enter your email" />);

			expect(
				screen.getByPlaceholderText('Enter your email'),
			).toBeInTheDocument();
		});

		it('associates the label with the input', () => {
			render(<Input label="Username" />);

			const input = screen.getByRole('textbox');
			const label = screen.getByText('Username');

			expect(input).toHaveAttribute('id');
			expect(label).toHaveAttribute('for', input.id);
		});
	});

	describe('Interactions', () => {
		it('allows the user to type', async () => {
			const user = userEvent.setup();

			render(<Input label="Username" />);

			const input = screen.getByRole('textbox');

			await user.type(input, 'john');

			expect(input).toHaveValue('john');
		});

		it('calls onChange when typing', async () => {
			const user = userEvent.setup();
			const onChange = vi.fn();

			render(<Input label="Username" onChange={onChange} />);

			const input = screen.getByRole('textbox');

			await user.type(input, 'john');

			expect(onChange).toHaveBeenCalledTimes(4);
			expect(input).toHaveValue('john');
		});

		it('prevents typing when disabled', async () => {
			const user = userEvent.setup();
			const onChange = vi.fn();

			render(<Input label="Username" disabled onChange={onChange} />);

			const input = screen.getByRole('textbox');

			expect(input).toBeDisabled();

			await user.type(input, 'john');

			expect(input).toHaveValue('');
			expect(onChange).not.toHaveBeenCalled();
		});

		it('supports a default value', () => {
			render(<Input label="Username" defaultValue="john" />);

			expect(screen.getByRole('textbox')).toHaveValue('john');
		});

		it('supports a controlled value', () => {
			const { rerender } = render(
				<Input label="Username" value="john" readOnly />,
			);

			expect(screen.getByRole('textbox')).toHaveValue('john');

			rerender(<Input label="Username" value="jane" readOnly />);

			expect(screen.getByRole('textbox')).toHaveValue('jane');
		});
	});

	describe('Validation', () => {
		it('supports required fields', () => {
			render(<Input label="Email" required />);

			expect(screen.getByRole('textbox')).toBeRequired();

			expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
		});

		it('displays an error message', () => {
			render(<Input label="Email" error="Invalid email address" />);

			const input = screen.getByRole('textbox');

			expect(screen.getByText('Invalid email address')).toBeInTheDocument();

			expect(input).toHaveAttribute('aria-invalid', 'true');
			expect(input).toHaveAccessibleDescription('Invalid email address');
		});

		it('does not mark a valid input as invalid', () => {
			render(<Input label="Email" />);

			expect(screen.getByRole('textbox')).not.toHaveAttribute(
				'aria-invalid',
				'true',
			);
		});

		it('supports an explicitly invalid state', () => {
			render(<Input label="Email" aria-invalid={true} />);

			expect(screen.getByRole('textbox')).toHaveAttribute(
				'aria-invalid',
				'true',
			);
		});
	});

	describe('Accessibility', () => {
		it('associates hint text with the input', () => {
			render(<Input label="Password" hint="Use at least 8 characters" />);

			expect(screen.getByRole('textbox')).toHaveAccessibleDescription(
				'Use at least 8 characters',
			);
		});

		it('associates hint and error messages', () => {
			render(
				<Input
					label="Email"
					hint="Enter your work email"
					error="Email is required"
				/>,
			);

			expect(screen.getByRole('textbox')).toHaveAccessibleDescription(
				'Enter your work email Email is required',
			);
		});

		it('preserves an external aria-describedby reference', () => {
			render(
				<>
					<p id="external-help">Additional guidance</p>
					<Input
						id="email"
						label="Email"
						hint="Enter your email"
						aria-describedby="external-help"
					/>
				</>,
			);

			expect(screen.getByRole('textbox')).toHaveAttribute(
				'aria-describedby',
				'external-help email-hint',
			);
		});
	});

	describe('Styling', () => {
		it('uses regular sizing by default', () => {
			render(<Input label="Username" />);

			expect(screen.getByRole('textbox')).toHaveClass('h-10');
		});

		it('uses compact sizing when specified', () => {
			render(<Input label="Username" compact />);

			expect(screen.getByRole('textbox')).toHaveClass('h-8');
		});

		it('applies error styling', () => {
			render(<Input label="Email" error="Invalid email" />);

			expect(screen.getByRole('textbox')).toHaveClass('border-danger');
		});

		it('accepts custom CSS classes', () => {
			render(<Input label="Username" className="custom-class" />);

			expect(screen.getByRole('textbox')).toHaveClass('custom-class');
		});
	});

	describe('HTML attributes', () => {
		it('forwards native input attributes', () => {
			render(
				<Input
					label="Email"
					type="email"
					name="email"
					autoComplete="email"
					maxLength={100}
				/>,
			);

			const input = screen.getByRole('textbox');

			expect(input).toHaveAttribute('type', 'email');
			expect(input).toHaveAttribute('name', 'email');
			expect(input).toHaveAttribute('autocomplete', 'email');
			expect(input).toHaveAttribute('maxlength', '100');
		});
	});
});
