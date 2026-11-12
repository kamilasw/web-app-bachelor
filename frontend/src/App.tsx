import { Avatar } from './components/ui/Avatar/Avatar';
import { Card } from './components/ui/Card/Card';
import { Badge } from './components/ui/Badge/Badge';

export default function App() {
	return (
		<main className="min-h-screen bg-background p-8">
			<Card className="max-w-md space-y-6">
				<h1 className="text-xl font-semibold">Avatar Component</h1>

				<Avatar src="/avatar.jpg" name="Alex Morgan" />

				<Avatar src="/avatar.jpg" name="Alex Morgan" avatarPosition="right" />

				<Avatar name="Alex Morgan" />

				<Avatar />

				<Avatar src="/avatar.jpg" />
			</Card>
			<Card className="flex flex-row flex-wrap gap-4">
				<Avatar name="Alex Morgan" />
				<Avatar name="Jordan Lee" avatarPosition="right" />
				<Avatar name="Taylor Smith" />
			</Card>
			<Card className="flex items-center flex-wrap gap-4">
				<Avatar name="Alex Morgan" />
				<Badge appearance="success">Active</Badge>
			</Card>
		</main>
	);
}
