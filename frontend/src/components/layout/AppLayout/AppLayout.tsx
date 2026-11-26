import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
	House,
	ChartNoAxesCombined,
	LayoutDashboard,
	ChartPie,
	Astroid,
	Settings,
} from 'lucide-react';

import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import type { SidebarItem } from '../Sidebar/Sidebar';
import { Avatar } from '../../ui/Avatar/Avatar';
import { Button } from '../../ui/Button/Button';
import { APP_NAME } from '../../../constants/app';

const items: SidebarItem[] = [
	{ label: 'Home', to: '/', icon: House, end: true },
	{
		label: 'Segmentation',
		to: '/segmentation',
		icon: ChartNoAxesCombined,
	},
	{
		label: 'Dashboards',
		to: '/dashboards',
		icon: LayoutDashboard,
	},
	{
		label: 'Widgets',
		to: '/widgets',
		icon: ChartPie,
	},
	{
		label: 'AI Assistant',
		to: '/assistant',
		icon: Astroid,
	},
];

export function AppLayout() {
	const [collapsed, setCollapsed] = useState(false);
	const navigate = useNavigate();

	return (
		<div className="flex min-h-screen flex-col bg-background">
			<Header
				left={
					<div className="flex items-center gap-2 font-semibold">
						<ChartNoAxesCombined className="size-6 text-primary" />
						{APP_NAME}
					</div>
				}
				right={
					<button onClick={() => navigate('/settings')}>
						<Avatar name="Client" avatarPosition="right" />
					</button>
				}
			/>

			<div className="flex flex-1">
				<Sidebar
					items={items}
					collapsed={collapsed}
					onToggle={() => setCollapsed(!collapsed)}
					footer={
						<Button
							appearance="subtle"
							compact
							size="sm"
							icon={Settings}
							aria-label="Settings"
							onClick={() => navigate('/settings')}
						>
							{!collapsed && 'Settings'}
						</Button>
					}
				/>

				<main className="min-w-0 flex-1 p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
