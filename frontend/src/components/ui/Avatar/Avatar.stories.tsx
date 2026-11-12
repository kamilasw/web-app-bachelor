import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from './Avatar';

const meta = {
	title: 'UI/Avatar',
	component: Avatar,

	parameters: {
		layout: 'centered',
	},

	argTypes: {
		avatarPosition: {
			control: 'radio',
			options: ['left', 'right'],
		},
		src: {
			control: 'text',
		},
	},

	args: {
		name: 'Example User',
		src: '',
		avatarPosition: 'left',
	},
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AvatarStory: Story = {
	name: 'Avatar',
};
