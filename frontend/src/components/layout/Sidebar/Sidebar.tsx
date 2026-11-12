import type { HTMLAttributes, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { Button } from '../../ui/Button/Button';

// Types
export interface SidebarItem {
	label: string;
	to: string;
	icon: LucideIcon;
	end?: boolean;
}

interface SidebarProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
	items: SidebarItem[];
	collapsed?: boolean;
	onToggle?: () => void;
	headerCollapsed?: boolean;
	header?: ReactNode;
	footer?: ReactNode;
}

// Styles
const baseStyles = clsx(
	'sticky hidden md:flex shrink-0 flex-col',
	'border-r border-border-default bg-surface',
	'text-foreground',
	'transition-[width,top,height] duration-200 ease-out',
	'motion-reduce:transition-none',
);

const itemStyles = clsx(
	'flex min-h-10 items-center gap-3',
	'rounded-sm px-3 text-sm font-medium',
	'transition-colors',
	'focus-visible:outline-2 focus-visible:outline-primary',
);

// Component
export function Sidebar({
	items,
	collapsed = false,
	onToggle,
	headerCollapsed = false,
	header,
	footer,
	className,
	...rest
}: SidebarProps) {
	return (
		<aside
			{...rest}
			aria-label="Application sidebar"
			className={clsx(
				baseStyles,
				collapsed ? 'w-16' : 'w-64',
				headerCollapsed
					? 'top-12 h-[calc(100dvh-3rem)]'
					: 'top-16 h-[calc(100dvh-4rem)]',
				className,
			)}
		>
			<div
				className={clsx(
					'flex min-h-16 items-center gap-2 border-b',
					'border-border-default px-3',
					collapsed ? 'justify-center' : 'justify-between',
				)}
			>
				{!collapsed && <div className="min-w-0">{header}</div>}

				{onToggle && (
					<Button
						appearance="subtle"
						size="sm"
						compact
						icon={collapsed ? PanelLeftOpen : PanelLeftClose}
						onClick={onToggle}
						aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
						title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
					/>
				)}
			</div>
			<nav
				aria-label="Main navigation"
				className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2"
			>
				{items.map(({ label, to, icon: Icon, end }) => (
					<NavLink
						key={to}
						to={to}
						end={end}
						title={collapsed ? label : undefined}
						className={({ isActive }) =>
							clsx(
								itemStyles,
								collapsed && 'justify-center',
								isActive
									? 'bg-primary/10 text-primary'
									: 'text-foreground hover:bg-neutral-hover',
							)
						}
					>
						<Icon className="size-5 shrink-0" aria-hidden="true" />

						<span className={collapsed ? 'sr-only' : 'truncate'}>{label}</span>
					</NavLink>
				))}
			</nav>
			{footer && !collapsed && (
				<div className="border-t border-border-default px-4 py-3">{footer}</div>
			)}
		</aside>
	);
}
