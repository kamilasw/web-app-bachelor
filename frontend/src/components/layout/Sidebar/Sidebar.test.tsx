import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { House, Settings, CircleHelp } from 'lucide-react';
import type { ComponentProps } from 'react';

import { Sidebar } from './Sidebar';
import type { SidebarItem } from './Sidebar';

const items: SidebarItem[] = [
	{ label: 'Home', to: '/', icon: House, end: true },
	{ label: 'Settings', to: '/settings', icon: Settings },
	{ label: 'Help', to: '/help', icon: CircleHelp },
];

function renderSidebar(
	props: Partial<ComponentProps<typeof Sidebar>> = {},
	path = '/',
) {
	return render(
		<MemoryRouter initialEntries={[path]}>
			<Sidebar items={items} {...props} />
		</MemoryRouter>,
	);
}

describe('Sidebar', () => {
	it('renders accessible navigation links', () => {
		renderSidebar();

		expect(
			screen.getByRole('complementary', {
				name: 'Application sidebar',
			}),
		).toBeInTheDocument();

		expect(
			screen.getByRole('navigation', { name: 'Main navigation' }),
		).toBeInTheDocument();

		expect(screen.getAllByRole('link')).toHaveLength(3);
	});

	it('renders the header and footer', () => {
		renderSidebar({
			header: 'Sidebar header',
			footer: 'Sidebar footer',
		});

		expect(screen.getByText('Sidebar header')).toBeInTheDocument();
		expect(screen.getByText('Sidebar footer')).toBeInTheDocument();
	});

	it('highlights the active navigation link', () => {
		renderSidebar({}, '/settings');

		expect(screen.getByRole('link', { name: 'Settings' })).toHaveAttribute(
			'aria-current',
			'page',
		);

		expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute(
			'aria-current',
		);
	});

	it('navigates when a link is clicked', async () => {
		const user = userEvent.setup();

		renderSidebar();

		await user.click(screen.getByRole('link', { name: 'Help' }));

		expect(screen.getByRole('link', { name: 'Help' })).toHaveAttribute(
			'aria-current',
			'page',
		);
	});

	it('calls onToggle when the toggle button is clicked', async () => {
		const user = userEvent.setup();
		const onToggle = vi.fn();

		renderSidebar({ onToggle });

		await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }));

		expect(onToggle).toHaveBeenCalledOnce();
	});

	it('hides header and footer content when collapsed', () => {
		renderSidebar({
			collapsed: true,
			header: 'Sidebar header',
			footer: 'Sidebar footer',
			onToggle: vi.fn(),
		});

		const sidebar = screen.getByRole('complementary');

		expect(sidebar).toHaveClass('w-16');
		expect(screen.queryByText('Sidebar header')).not.toBeInTheDocument();
		expect(screen.queryByText('Sidebar footer')).not.toBeInTheDocument();

		expect(
			screen.getByRole('button', { name: 'Expand sidebar' }),
		).toBeInTheDocument();
	});

	it('adjusts its position when the header is collapsed', () => {
		renderSidebar({ headerCollapsed: true });

		expect(screen.getByRole('complementary')).toHaveClass(
			'top-12',
			'h-[calc(100dvh-3rem)]',
		);
	});

	it('forwards custom classes and HTML attributes', () => {
		renderSidebar({
			className: 'custom-class',
			title: 'Navigation sidebar',
		});

		const sidebar = screen.getByRole('complementary');

		expect(sidebar).toHaveClass('custom-class');
		expect(sidebar).toHaveAttribute('title', 'Navigation sidebar');
	});
});
