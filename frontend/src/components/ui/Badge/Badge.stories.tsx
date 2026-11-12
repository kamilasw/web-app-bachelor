import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from './Badge';

const meta = {
	title: 'UI/Badge',
	component: Badge,

	parameters: {
		layout: 'centered',
	},

	argTypes: {
		appearance: {
			control: 'select',
			options: [
				'default',
				'information',
				'success',
				'warning',
				'danger',
				'discovery',
			],
		},
		children: {
			control: 'text',
		},
	},

	args: {
		children: 'Badge',
		appearance: 'default',
	},
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BadgeStory: Story = {
	name: 'Badge',
};
