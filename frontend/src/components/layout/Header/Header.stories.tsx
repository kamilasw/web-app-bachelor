import type { Meta, StoryObj } from '@storybook/react-vite';

import { Header } from './Header';

const meta = {
	title: 'Layout/Header',
	component: Header,

	parameters: {
		layout: 'fullscreen',
	},

	argTypes: {
		left: {
			control: 'text',
		},
		center: {
			control: 'text',
		},
		right: {
			control: 'text',
		},
	},

	args: {
		left: 'Left content',
		center: 'Header',
		right: 'Right content',
		collapsed: false,
	},
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HeaderStory: Story = {
	name: 'Header',
};
