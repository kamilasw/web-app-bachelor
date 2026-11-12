import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import { Slider } from './Slider';

const meta = {
	title: 'UI/Slider',
	component: Slider,

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
		value: {
			control: 'number',
		},
		defaultValue: {
			control: false,
		},
	},

	args: {
		label: 'Value',
		hint: 'Adjust the value.',
		min: 0,
		max: 100,
		step: 1,
		value: 40,
		disabled: false,
		onChange: fn(),
	},
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SliderStory: Story = {
	name: 'Slider',

	render: function Render(args) {
		const [, updateArgs] = useArgs();

		return (
			<Slider
				{...args}
				onChange={(event) => {
					updateArgs({
						value: event.currentTarget.valueAsNumber,
					});
					args.onChange?.(event);
				}}
			/>
		);
	},
};
