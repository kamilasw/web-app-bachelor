import { createPortal } from 'react-dom';
import { CircleCheck, CircleAlert, Info, X } from 'lucide-react';

export type ToastAppearance = 'default' | 'success' | 'error';

export interface ToastProps {
	title: string;
	description?: string;
	appearance?: ToastAppearance;
	onDismiss: () => void;
}

const appearances = {
	default: {
		icon: Info,
		container: 'bg-surface text-foreground border border-default',
		iconColor: 'text-primary',
	},
	success: {
		icon: CircleCheck,
		container: 'bg-success text-white',
		iconColor: 'text-white',
	},
	error: {
		icon: CircleAlert,
		container: 'bg-danger text-white',
		iconColor: 'text-white',
	},
};

export function Toast({
	title,
	description,
	appearance = 'default',
	onDismiss,
}: ToastProps) {
	const { icon: Icon, container, iconColor } = appearances[appearance];

	return createPortal(
		<div
			className={`fixed bottom-4 left-4 right-4 z-50 flex items-start gap-4 rounded-lg p-5 shadow-lg sm:right-auto sm:w-96 ${container}`}
		>
			<Icon className={`size-5 shrink-0 ${iconColor}`} aria-hidden="true" />

			<div
				className="min-w-0 flex-1"
				role={appearance === 'error' ? 'alert' : 'status'}
			>
				<p className="text-sm font-semibold">{title}</p>

				{description && <p className="mt-2 text-sm">{description}</p>}
			</div>

			<button
				type="button"
				aria-label="Dismiss notification"
				onClick={onDismiss}
				className="shrink-0 cursor-pointer rounded-sm opacity-80 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2"
			>
				<X className="size-4" aria-hidden="true" />
			</button>
		</div>,
		document.body,
	);
}
