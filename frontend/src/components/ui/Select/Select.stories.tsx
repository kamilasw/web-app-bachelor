import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Select } from './Select';

const meta = {
	title: 'UI/Select',
	component: Select,

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
		label: 'Select an option',
		options: [
			{ value: 'option1', label: 'Option 1' },
			{ value: 'option2', label: 'Option 2' },
			{ value: 'option3', label: 'Option 3' },
		],
		placeholder: 'Choose an option',
		hint: 'Select one of the available options.',
		error: '',
		compact: false,
		required: false,
		disabled: false,
		onChange: fn(),
	},
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SelectStory: Story = {
	name: 'Select',
};
