import { beforeAll, afterAll, describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Modal } from './Modal';

// jsdom may not implement the native dialog methods.
const originalShowModal = Object.getOwnPropertyDescriptor(
	HTMLDialogElement.prototype,
	'showModal',
);
const originalClose = Object.getOwnPropertyDescriptor(
	HTMLDialogElement.prototype,
	'close',
);

beforeAll(() => {
	HTMLDialogElement.prototype.showModal = function () {
		this.setAttribute('open', '');
	};

	HTMLDialogElement.prototype.close = function () {
		this.removeAttribute('open');
	};
});

afterAll(() => {
	if (originalShowModal) {
		Object.defineProperty(
			HTMLDialogElement.prototype,
			'showModal',
			originalShowModal,
		);
	} else {
		Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal');
	}

	if (originalClose) {
		Object.defineProperty(HTMLDialogElement.prototype, 'close', originalClose);
	} else {
		Reflect.deleteProperty(HTMLDialogElement.prototype, 'close');
	}
});

describe('Modal', () => {
	it('renders an open dialog with an accessible title', () => {
		render(
			<Modal open onClose={vi.fn()} title="Example modal">
				Modal content
			</Modal>,
		);

		const dialog = screen.getByRole('dialog', {
			name: 'Example modal',
		});

		expect(dialog).toBeInTheDocument();
		expect(dialog).toHaveTextContent('Modal content');
		expect(dialog).toHaveAttribute('open');
	});

	it('remains closed when open is false', () => {
		const { container } = render(
			<Modal open={false} onClose={vi.fn()} title="Example modal">
				Content
			</Modal>,
		);

		expect(container.querySelector('dialog')).not.toHaveAttribute('open');
	});

	it('opens and closes when the open prop changes', () => {
		const onClose = vi.fn();

		const { rerender } = render(
			<Modal open={false} onClose={onClose} title="Modal">
				Content
			</Modal>,
		);

		const dialog = document.querySelector('dialog')!;

		expect(dialog.open).toBe(false);

		rerender(
			<Modal open onClose={onClose} title="Modal">
				Content
			</Modal>,
		);

		expect(dialog.open).toBe(true);

		rerender(
			<Modal open={false} onClose={onClose} title="Modal">
				Content
			</Modal>,
		);

		expect(dialog.open).toBe(false);
	});

	it('calls onClose when the close button is clicked', async () => {
		const user = userEvent.setup();
		const onClose = vi.fn();

		render(
			<Modal open onClose={onClose} title="Modal">
				Content
			</Modal>,
		);

		await user.click(screen.getByRole('button', { name: 'Close dialog' }));

		expect(onClose).toHaveBeenCalledOnce();
	});

	it('calls onClose and prevents the default cancel action', () => {
		const onClose = vi.fn();

		render(
			<Modal open onClose={onClose} title="Modal">
				Content
			</Modal>,
		);

		const dialog = screen.getByRole('dialog');
		const event = new Event('cancel', { cancelable: true });

		fireEvent(dialog, event);

		expect(onClose).toHaveBeenCalledOnce();
		expect(event.defaultPrevented).toBe(true);
	});

	it('renders an optional footer', () => {
		render(
			<Modal
				open
				onClose={vi.fn()}
				title="Modal"
				footer={<button type="button">Confirm</button>}
			>
				Content
			</Modal>,
		);

		expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
	});

	it('supports footer button interactions', async () => {
		const user = userEvent.setup();
		const onConfirm = vi.fn();

		render(
			<Modal
				open
				onClose={vi.fn()}
				title="Modal"
				footer={
					<button type="button" onClick={onConfirm}>
						Confirm
					</button>
				}
			>
				Content
			</Modal>,
		);

		await user.click(screen.getByRole('button', { name: 'Confirm' }));

		expect(onConfirm).toHaveBeenCalledOnce();
	});
});
