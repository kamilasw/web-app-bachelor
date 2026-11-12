import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

// Types
interface ModalProps {
	open: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
	footer?: ReactNode;
}

// Styles
const baseStyles = clsx(
	'w-[calc(100%-2rem)] max-w-lg',
	'max-h-[calc(100dvh-2rem)]',
	'm-auto overflow-y-auto',
	'rounded-lg border border-border-default',
	'bg-surface text-foreground shadow-lg',
	'p-0',
	'backdrop:bg-black/50',
);

// Component
export function Modal({ open, onClose, title, children, footer }: ModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const titleId = useId();

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (open && !dialog.open) {
			dialog.showModal();
		} else if (!open && dialog.open) {
			dialog.close();
		}
	}, [open]);

	return (
		<dialog
			ref={dialogRef}
			aria-labelledby={titleId}
			onCancel={(event) => {
				event.preventDefault();
				onClose();
			}}
			className={baseStyles}
		>
			<div className="flex items-center justify-between gap-4 border-b border-border-default px-6 py-4">
				<h2 id={titleId} className="text-lg font-semibold">
					{title}
				</h2>

				<button
					type="button"
					onClick={onClose}
					autoFocus
					aria-label="Close dialog"
					className={clsx(
						'flex size-8 shrink-0 items-center justify-center',
						'rounded-sm text-muted cursor-pointer',
						'hover:bg-neutral-hover',
						'focus-visible:outline-2 focus-visible:outline-primary',
					)}
				>
					<X className="size-[1.25em]" aria-hidden="true" />
				</button>
			</div>

			<div className="px-6 py-4">{children}</div>

			{footer && (
				<div className="flex flex-wrap items-center justify-end gap-2 border-t border-border-default px-6 py-4">
					{footer}
				</div>
			)}
		</dialog>
	);
}
