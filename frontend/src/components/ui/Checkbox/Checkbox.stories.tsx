import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import { Checkbox } from './Checkbox';

const meta = {
	title: 'UI/Checkbox',
	component: Checkbox,

	parameters: {
		layout: 'centered',
	},

	argTypes: {
		checked: {
			control: 'boolean',
		},
		defaultChecked: {
			table: {
				disable: true,
			},
		},
	},

	args: {
		label: 'Checkbox',
		checked: false,
		disabled: false,
		required: false,
		onChange: fn(),
	},
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CheckboxStory: Story = {
	name: 'Checkbox',

	render: function Render(args) {
		const [, updateArgs] = useArgs();

		return (
			<Checkbox
				{...args}
				onChange={(event) => {
					updateArgs({ checked: event.currentTarget.checked });
					args.onChange?.(event);
				}}
			/>
		);
	},
};
