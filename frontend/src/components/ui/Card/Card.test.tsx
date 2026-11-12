import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Card } from './Card';

describe('Card', () => {
	it('renders its children', () => {
		render(<Card>Card content</Card>);

		expect(screen.getByText('Card content')).toBeInTheDocument();
	});

	it('uses default styling', () => {
		render(<Card>Card content</Card>);

		expect(screen.getByText('Card content')).toHaveClass(
			'rounded-lg',
			'border',
			'p-6',
		);
	});

	it('supports compact styling', () => {
		render(<Card compact>Card content</Card>);

		expect(screen.getByText('Card content')).toHaveClass('p-3');
	});

	it('can disable the border', () => {
		render(<Card bordered={false}>Card content</Card>);

		expect(screen.getByText('Card content')).not.toHaveClass('border');
	});

	it('supports shadow styling', () => {
		render(<Card shadow>Card content</Card>);

		expect(screen.getByText('Card content')).toHaveClass('shadow-md');
	});

	it('forwards HTML attributes and custom classes', () => {
		render(
			<Card className="custom-class" role="region" aria-label="Example card">
				Card content
			</Card>,
		);

		const card = screen.getByRole('region', {
			name: 'Example card',
		});

		expect(card).toHaveClass('custom-class');
		expect(card).toHaveTextContent('Card content');
	});

	it('supports click events', async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();

		render(<Card onClick={onClick}>Card content</Card>);

		await user.click(screen.getByText('Card content'));

		expect(onClick).toHaveBeenCalledOnce();
	});
});
