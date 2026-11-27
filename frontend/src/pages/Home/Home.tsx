import { useNavigate } from 'react-router-dom';
import {
	ChartNoAxesCombined,
	LayoutDashboard,
	ChartPie,
	Astroid,
	Plus,
	History,
} from 'lucide-react';

import { Button } from '../../components/ui/Button/Button';
import { Card } from '../../components/ui/Card/Card';

const sections = [
	{
		title: 'Segmentation',
		description: 'Configure and run customer segmentation algorithms.',
		icon: ChartNoAxesCombined,
		action: 'View',
		path: '/segmentation',
	},
	{
		title: 'Dashboards',
		description: 'Create, personalize with widgets and manage your dashboards.',
		icon: LayoutDashboard,
		action: 'View',
		path: '/dashboards',
	},
	{
		title: 'Widgets',
		description: 'Create and manage reusable data visualization charts.',
		icon: ChartPie,
		action: 'View',
		path: '/widgets',
	},
	{
		title: 'AI Assistant',
		description: 'Ask questions about specific customer segmentation runs.',
		icon: Astroid,
		action: 'Open assistant',
		path: '/assistant',
	},
];

export function Home() {
	const navigate = useNavigate();

	return (
		<div className="mx-auto flex max-w-6xl flex-col gap-8">
			<section className="flex flex-col items-start gap-4">
				<div>
					<h1 className="text-2xl font-semibold">Welcome back, Client</h1>
				</div>

				<Button
					appearance="primary"
					icon={Plus}
					onClick={() => navigate('/segmentation')}
				>
					New Segmentation
				</Button>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="text-lg font-semibold">Workspace</h2>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{sections.map((section) => (
						<Card
							key={section.title}
							bordered
							className="flex flex-row items-center gap-4"
						>
							<section.icon className="size-6 text-primary" />

							<div className="flex-1">
								<h3 className="font-semibold">{section.title}</h3>

								<p className="mt-1 text-sm text-muted">{section.description}</p>
							</div>

							<Button
								appearance="default"
								onClick={() => navigate(section.path)}
							>
								{section.action}
							</Button>
						</Card>
					))}
				</div>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="text-lg font-semibold">Recent activity</h2>

				<Card bordered className="flex flex-col items-center gap-2 py-10">
					<History className="size-8 text-muted" />

					<h3 className="font-medium">No recent activity</h3>

					<p className="text-sm text-muted">
						Your segmentation runs will appear here.
					</p>
				</Card>
			</section>
		</div>
	);
}
