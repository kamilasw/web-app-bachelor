import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Input } from './Input';

const meta = {
	title: 'UI/Input',
	component: Input,

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

	argTypes: {
		type: {
			control: 'select',
			options: ['text', 'email', 'password', 'number', 'search'],
		},
	},

	args: {
		label: 'Email address',
		type: 'email',
		placeholder: 'Enter your email',
		hint: 'Enter your work email address.',
		error: '',
		compact: false,
		required: false,
		disabled: false,
		onChange: fn(),
	},
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InputStory: Story = {
	name: 'Input',
};
