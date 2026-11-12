import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Plus } from 'lucide-react';

import { Button } from './Button';

describe('Button', () => {
	describe('Rendering', () => {
		it('renders the button with its text', () => {
			render(<Button>Click me</Button>);

			expect(
				screen.getByRole('button', { name: 'Click me' }),
			).toBeInTheDocument();
		});

		it('uses the correct default properties', () => {
			render(<Button>Button</Button>);

			const button = screen.getByRole('button');

			expect(button).toHaveAttribute('type', 'button');
			expect(button).toHaveClass('bg-surface');
			expect(button).toHaveClass('h-10');
			expect(button).toBeEnabled();
		});
	});

	describe('Interactions', () => {
		it('calls onClick when clicked', async () => {
			const user = userEvent.setup();
			const onClick = vi.fn();

			render(<Button onClick={onClick}>Click me</Button>);

			await user.click(screen.getByRole('button', { name: 'Click me' }));

			expect(onClick).toHaveBeenCalledOnce();
		});

		it('does not call onClick when disabled', async () => {
			const user = userEvent.setup();
			const onClick = vi.fn();

			render(
				<Button disabled onClick={onClick}>
					Click me
				</Button>,
			);

			const button = screen.getByRole('button');

			expect(button).toBeDisabled();

			await user.click(button);

			expect(onClick).not.toHaveBeenCalled();
		});

		it('does not submit a form by default', async () => {
			const user = userEvent.setup();
			const onSubmit = vi.fn();

			render(
				<form onSubmit={onSubmit}>
					<Button>Cancel</Button>
				</form>,
			);

			await user.click(screen.getByRole('button', { name: 'Cancel' }));

			expect(onSubmit).not.toHaveBeenCalled();
		});
	});

	describe('Loading state', () => {
		it('shows loading text and disables interaction', async () => {
			const user = userEvent.setup();
			const onClick = vi.fn();

			render(
				<Button loading onClick={onClick}>
					Save changes
				</Button>,
			);

			const button = screen.getByRole('button');

			expect(button).toHaveTextContent('Loading...');
			expect(button).toBeDisabled();
			expect(button).toHaveAttribute('aria-busy', 'true');

			await user.click(button);

			expect(onClick).not.toHaveBeenCalled();
		});

		it('hides the normal content while loading', () => {
			render(
				<Button loading icon={Plus}>
					Add item
				</Button>,
			);

			const button = screen.getByRole('button');

			expect(button).toHaveTextContent('Loading...');
			expect(button).not.toHaveTextContent('Add item');
			expect(button.querySelector('svg')).not.toBeInTheDocument();
		});
	});

	describe('Appearance', () => {
		it.each([
			['primary', 'bg-primary'],
			['default', 'bg-surface'],
			['subtle', 'bg-transparent'],
			['danger', 'bg-danger'],
			['discovery', 'bg-discovery'],
		] as const)('applies the %s appearance', (appearance, expectedClass) => {
			render(<Button appearance={appearance}>Button</Button>);

			expect(screen.getByRole('button')).toHaveClass(expectedClass);
		});
	});

	describe('Size and spacing', () => {
		it.each([
			['sm', 'h-8'],
			['lg', 'h-10'],
		] as const)('applies the %s size', (size, expectedClass) => {
			render(<Button size={size}>Button</Button>);

			expect(screen.getByRole('button')).toHaveClass(expectedClass);
		});

		it('uses compact padding when compact is true', () => {
			render(<Button compact>Button</Button>);

			expect(screen.getByRole('button')).toHaveClass('px-2');
		});

		it('uses regular padding by default', () => {
			render(<Button>Button</Button>);

			expect(screen.getByRole('button')).toHaveClass('px-4');
		});
	});

	describe('Icon', () => {
		it('renders the provided icon', () => {
			render(<Button icon={Plus}>Add item</Button>);

			const button = screen.getByRole('button');
			const icon = button.querySelector('svg');

			expect(icon).toBeInTheDocument();
			expect(icon).toHaveAttribute('aria-hidden', 'true');
		});

		it('supports an accessible icon-only button', () => {
			render(<Button icon={Plus} aria-label="Add item" compact />);

			expect(
				screen.getByRole('button', { name: 'Add item' }),
			).toBeInTheDocument();
		});
	});

	describe('HTML attributes', () => {
		it('forwards native button attributes', () => {
			render(
				<Button type="submit" title="Submit form">
					Submit
				</Button>,
			);

			const button = screen.getByRole('button');

			expect(button).toHaveAttribute('type', 'submit');
			expect(button).toHaveAttribute('title', 'Submit form');
		});

		it('supports custom CSS classes', () => {
			render(<Button className="custom-class">Button</Button>);

			expect(screen.getByRole('button')).toHaveClass('custom-class');
		});
	});
});
