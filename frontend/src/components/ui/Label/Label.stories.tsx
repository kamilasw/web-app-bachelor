import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from './Label';

const meta = {
	title: 'UI/Label',
	component: Label,

	parameters: {
		layout: 'centered',
	},

	argTypes: {
		appearance: {
			control: 'select',
			options: ['default', 'prominent'],
		},
		children: {
			control: 'text',
		},
	},

	args: {
		children: 'Example label',
		appearance: 'default',
		bordered: false,
		required: false,
	},
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LabelStory: Story = {
	name: 'Label',
};
