import { Outlet } from 'react-router-dom';
import { ChartNoAxesCombined } from 'lucide-react';
import { APP_NAME } from '../../../constants/app';

export function AuthLayout() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-4 text-foreground">
			<div className="flex items-center gap-2 text-lg font-semibold">
				<ChartNoAxesCombined className="size-6 text-primary" />
				{APP_NAME}
			</div>

			<div className="w-full max-w-sm">
				<Outlet />
			</div>
		</main>
	);
}
