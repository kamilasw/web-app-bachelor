import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Plus } from 'lucide-react';

import { Button } from './Button';

const meta = {
	title: 'UI/Button',
	component: Button,

	parameters: {
		layout: 'centered',
	},

	argTypes: {
		appearance: {
			control: 'select',
			options: ['primary', 'default', 'subtle', 'danger', 'discovery'],
		},
		size: {
			control: 'radio',
			options: ['sm', 'lg'],
		},
		icon: {
			control: 'select',
			options: ['None', 'Plus'],
			mapping: {
				None: undefined,
				Plus,
			},
		},
	},

	args: {
		children: 'Button',
		appearance: 'primary',
		size: 'lg',
		compact: false,
		disabled: false,
		loading: false,
		onClick: fn(),
	},
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ButtonStory: Story = {
	name: 'Button',
};
