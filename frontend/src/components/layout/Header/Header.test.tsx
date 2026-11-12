import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Header } from './Header';

describe('Header', () => {
	it('renders as a semantic header', () => {
		render(<Header />);

		expect(screen.getByRole('banner')).toBeInTheDocument();
	});

	it('renders all three content slots', () => {
		render(
			<Header
				left={<span>Left content</span>}
				center={<span>Center content</span>}
				right={<span>Right content</span>}
			/>,
		);

		expect(screen.getByText('Left content')).toBeInTheDocument();
		expect(screen.getByText('Center content')).toBeInTheDocument();
		expect(screen.getByText('Right content')).toBeInTheDocument();
	});

	it('uses expanded styling by default', () => {
		render(<Header />);

		expect(screen.getByRole('banner').firstElementChild).toHaveClass(
			'min-h-16',
			'py-2',
		);
	});

	it('uses compact styling when collapsed', () => {
		render(<Header collapsed />);

		expect(screen.getByRole('banner').firstElementChild).toHaveClass(
			'min-h-12',
			'py-1',
		);
	});

	it('updates its layout when collapsed changes', () => {
		const { rerender } = render(<Header collapsed={false} />);

		const layout = screen.getByRole('banner').firstElementChild;

		expect(layout).toHaveClass('min-h-16');

		rerender(<Header collapsed />);

		expect(layout).toHaveClass('min-h-12');
	});

	it('supports custom classes and HTML attributes', () => {
		render(
			<Header
				className="custom-class"
				aria-label="Application header"
				title="Header"
			/>,
		);

		const header = screen.getByRole('banner', {
			name: 'Application header',
		});

		expect(header).toHaveClass('custom-class');
		expect(header).toHaveAttribute('title', 'Header');
	});
});
