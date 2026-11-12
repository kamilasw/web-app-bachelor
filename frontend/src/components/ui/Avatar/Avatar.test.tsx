import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { Avatar } from './Avatar';

describe('Avatar', () => {
	it('renders an image and name', () => {
		const { container } = render(
			<Avatar src="/avatar.png" name="Example User" />,
		);

		const image = container.querySelector('img');

		expect(image).toHaveAttribute('src', '/avatar.png');
		expect(image).toHaveAttribute('alt', '');
		expect(screen.getByText('Example User')).toBeInTheDocument();
	});

	it('provides accessible alt text without a name', () => {
		render(<Avatar src="/avatar.png" />);

		expect(
			screen.getByRole('img', { name: 'User avatar' }),
		).toBeInTheDocument();
	});

	it('renders a fallback when no image is provided', () => {
		render(<Avatar />);

		expect(
			screen.getByRole('img', { name: 'User avatar' }),
		).toBeInTheDocument();
	});

	it('displays the name with a decorative fallback', () => {
		render(<Avatar name="Example User" />);

		expect(screen.getByText('Example User')).toBeInTheDocument();
		expect(screen.queryByRole('img')).not.toBeInTheDocument();
	});

	it('shows the fallback when the image fails', () => {
		const { container } = render(<Avatar src="/invalid.png" />);

		const image = screen.getByRole('img');

		fireEvent.error(image);

		expect(container.querySelector('img')).not.toBeInTheDocument();
		expect(
			screen.getByRole('img', { name: 'User avatar' }),
		).toBeInTheDocument();
	});

	it('displays a new image after a previous one failed', () => {
		const { rerender } = render(<Avatar src="/invalid.png" />);

		fireEvent.error(screen.getByRole('img'));

		rerender(<Avatar src="/new-avatar.png" />);

		expect(screen.getByRole('img')).toHaveAttribute('src', '/new-avatar.png');
	});

	it('supports right-side avatar positioning', () => {
		const { container } = render(
			<Avatar name="Example User" avatarPosition="right" />,
		);

		expect(container.firstElementChild).toHaveClass('flex-row-reverse');
	});

	it('supports custom classes and HTML attributes', () => {
		const { container } = render(
			<Avatar
				name="Example User"
				className="custom-class"
				title="User profile"
			/>,
		);

		expect(container.firstElementChild).toHaveClass('custom-class');
		expect(container.firstElementChild).toHaveAttribute(
			'title',
			'User profile',
		);
	});
});
