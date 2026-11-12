import type { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

// Types
interface HeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
	left?: ReactNode;
	center?: ReactNode;
	right?: ReactNode;
	collapsed?: boolean;
}

// Styles
const baseStyles = clsx(
	'sticky top-0 z-50',
	'w-full bg-surface text-foreground',
	'border-b border-border-default',
);

const layoutStyles = clsx(
	'grid w-full items-center',
	'grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]',
	'px-4 sm:px-6 lg:px-8',
	'gap-2 sm:gap-4',
	'transition-[min-height,padding] duration-200 ease-out',
	'motion-reduce:transition-none',
);

// Component
export function Header({
	left,
	center,
	right,
	collapsed = false,
	className,
	...rest
}: HeaderProps) {
	return (
		<header {...rest} className={clsx(baseStyles, className)}>
			<div
				className={clsx(
					layoutStyles,
					collapsed ? 'min-h-12 py-1' : 'min-h-16 py-2',
				)}
			>
				<div className="flex min-w-0 items-center justify-start">{left}</div>

				<div className="flex min-w-0 items-center justify-center">{center}</div>

				<div className="flex min-w-0 items-center justify-end">{right}</div>
			</div>
		</header>
	);
}
