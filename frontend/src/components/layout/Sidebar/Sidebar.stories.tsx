import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { House, Settings, CircleHelp } from 'lucide-react';

import { Sidebar } from './Sidebar';

function RoutePreview() {
	const location = useLocation();

	return (
		<main className="flex-1 p-6">
			<p className="text-sm text-muted">Current route: {location.pathname}</p>
		</main>
	);
}

const meta = {
	title: 'Layout/Sidebar',
	component: Sidebar,

	parameters: {
		layout: 'fullscreen',
	},

	argTypes: {
		items: {
			control: false,
		},
	},

	args: {
		items: [
			{ label: 'Home', to: '/', icon: House, end: true },
			{ label: 'Settings', to: '/settings', icon: Settings },
			{ label: 'Help', to: '/help', icon: CircleHelp },
		],
		collapsed: false,
		headerCollapsed: false,
		header: 'Navigation',
		footer: 'Footer content',
		onToggle: fn(),
	},
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SidebarStory: Story = {
	name: 'Sidebar',

	render: function Render(args) {
		const [, updateArgs] = useArgs();

		return (
			<MemoryRouter initialEntries={['/']}>
				<div className="flex min-h-screen">
					<Sidebar
						{...args}
						onToggle={() => {
							updateArgs({ collapsed: !args.collapsed });
							args.onToggle?.();
						}}
					/>
					<RoutePreview />
				</div>
			</MemoryRouter>
		);
	},
};
