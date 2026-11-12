import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Label } from './Label';

describe('Label', () => {
	it('renders the label text', () => {
		render(<Label>Example label</Label>);

		expect(screen.getByText('Example label')).toBeInTheDocument();
	});

	it('uses the default appearance', () => {
		render(<Label>Example label</Label>);

		expect(screen.getByText('Example label')).toHaveClass('text-muted');
	});

	it('supports the prominent appearance', () => {
		render(<Label appearance="prominent">Example label</Label>);

		expect(screen.getByText('Example label')).toHaveClass('text-primary');
	});

	it('supports bordered styling', () => {
		render(<Label bordered>Example label</Label>);

		expect(screen.getByText('Example label')).toHaveClass(
			'border',
			'border-current',
		);
	});

	it('displays a required indicator', () => {
		render(<Label required>Example label</Label>);

		expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
	});

	it('does not display a required indicator by default', () => {
		render(<Label>Example label</Label>);

		expect(screen.queryByText('*')).not.toBeInTheDocument();
	});

	it('associates with an input and focuses it when clicked', async () => {
		const user = userEvent.setup();

		render(
			<>
				<Label htmlFor="example-input">Example label</Label>
				<input id="example-input" />
			</>,
		);

		await user.click(screen.getByText('Example label'));

		expect(screen.getByRole('textbox')).toHaveFocus();
	});

	it('supports custom CSS classes and HTML attributes', () => {
		render(
			<Label className="custom-class" title="Help text">
				Example label
			</Label>,
		);

		const label = screen.getByText('Example label');

		expect(label).toHaveClass('custom-class');
		expect(label).toHaveAttribute('title', 'Help text');
	});
});
