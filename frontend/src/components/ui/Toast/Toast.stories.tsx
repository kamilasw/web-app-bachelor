import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Toast } from './Toast';
import type { ToastProps } from './Toast';
import { Button } from '../Button/Button';

function ToastExample(args: ToastProps) {
	const [visible, setVisible] = useState(true);

	return (
		<>
			<Button onClick={() => setVisible(true)}>Show notification</Button>

			{visible && (
				<Toast
					{...args}
					onDismiss={() => {
						setVisible(false);
						args.onDismiss();
					}}
				/>
			)}
		</>
	);
}

const meta = {
	title: 'UI/Toast',
	component: Toast,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {
		title: 'Notification',
		description: 'Additional information.',
		appearance: 'default',
		onDismiss: fn(),
	},
	render: (args) => <ToastExample {...args} />,
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Success: Story = {
	args: {
		title: 'Operation successful',
		description: 'Your changes have been saved.',
		appearance: 'success',
	},
};

export const Error: Story = {
	args: {
		title: 'Operation failed',
		description: 'Please try again.',
		appearance: 'error',
	},
};

export const WithoutDescription: Story = {
	args: {
		description: undefined,
	},
};
