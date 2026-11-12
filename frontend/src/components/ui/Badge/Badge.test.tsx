import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Badge } from './Badge';

describe('Badge', () => {
	it('renders the badge content', () => {
		render(<Badge>Example badge</Badge>);

		const badge = screen.getByText('Example badge');

		expect(badge).toBeInTheDocument();
		expect(badge.tagName).toBe('SPAN');
	});

	it.each([
		['default', 'bg-neutral-hover'],
		['information', 'bg-primary/10'],
		['success', 'bg-success/10'],
		['warning', 'bg-warning/10'],
		['danger', 'bg-danger/10'],
		['discovery', 'bg-discovery/10'],
	] as const)('applies the %s appearance', (appearance, expectedClass) => {
		render(<Badge appearance={appearance}>Badge</Badge>);

		expect(screen.getByText('Badge')).toHaveClass(expectedClass);
	});

	it('uses the default appearance', () => {
		render(<Badge>Badge</Badge>);

		expect(screen.getByText('Badge')).toHaveClass('bg-neutral-hover');
	});

	it('supports custom classes and HTML attributes', () => {
		render(
			<Badge className="custom-class" title="Badge tooltip">
				Badge
			</Badge>,
		);

		const badge = screen.getByText('Badge');

		expect(badge).toHaveClass('custom-class');
		expect(badge).toHaveAttribute('title', 'Badge tooltip');
	});
});
