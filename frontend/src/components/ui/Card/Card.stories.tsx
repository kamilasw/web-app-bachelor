import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card } from './Card';

const meta = {
	title: 'UI/Card',
	component: Card,

	parameters: {
		layout: 'centered',
	},

	decorators: [
		(Story) => (
			<div className="w-80">
				<Story />
			</div>
		),
	],

	args: {
		children: 'Card content',
		bordered: true,
		compact: false,
		shadow: false,
	},
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CardStory: Story = {
	name: 'Card',
};
