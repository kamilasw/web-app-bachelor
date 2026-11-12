import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import { Modal } from './Modal';
import { Button } from '../Button/Button';

const meta = {
	title: 'UI/Modal',
	component: Modal,

	parameters: {
		layout: 'centered',
	},

	argTypes: {
		children: {
			control: false,
		},
		footer: {
			control: false,
		},
	},

	args: {
		open: false,
		title: 'Example modal',
		children: 'This is the modal content.',
		onClose: fn(),
	},
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ModalStory: Story = {
	name: 'Modal',

	render: function Render(args) {
		const [, updateArgs] = useArgs();

		const handleClose = () => {
			updateArgs({ open: false });
			args.onClose();
		};

		return (
			<>
				<Button appearance="primary" onClick={() => updateArgs({ open: true })}>
					Open modal
				</Button>

				<Modal
					{...args}
					onClose={handleClose}
					footer={
						<Button appearance="primary" onClick={handleClose}>
							Done
						</Button>
					}
				/>
			</>
		);
	},
};
