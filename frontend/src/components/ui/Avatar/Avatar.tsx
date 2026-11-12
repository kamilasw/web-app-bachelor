import { useState } from 'react';
import type { HTMLAttributes } from 'react';
import { UserRound } from 'lucide-react';
import clsx from 'clsx';

// Types
type AvatarPosition = 'left' | 'right';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
	src?: string;
	name?: string;
	avatarPosition?: AvatarPosition;
}

// Styles
const baseStyles = clsx(
	'inline-flex w-fit items-center gap-2',
	'text-sm font-medium text-foreground',
);

const imageStyles = clsx('size-10 shrink-0 rounded-full object-cover');

const fallbackStyles = clsx(
	'flex size-10 shrink-0 items-center justify-center',
	'rounded-full bg-neutral-hover text-muted',
);

// Component
export function Avatar({
	src,
	name,
	avatarPosition = 'left',
	className,
	...rest
}: AvatarProps) {
	const [failedSrc, setFailedSrc] = useState<string | undefined>();

	const showImage = Boolean(src && src !== failedSrc);

	return (
		<div
			{...rest}
			className={clsx(
				baseStyles,
				avatarPosition === 'right' && 'flex-row-reverse',
				className,
			)}
		>
			{showImage ? (
				<img
					src={src}
					alt={name ? '' : 'User avatar'}
					className={imageStyles}
					onError={() => setFailedSrc(src)}
				/>
			) : (
				<span
					className={fallbackStyles}
					role={name ? undefined : 'img'}
					aria-label={name ? undefined : 'User avatar'}
					aria-hidden={name ? true : undefined}
				>
					<UserRound className="size-5" aria-hidden="true" />
				</span>
			)}

			{name && <span className="truncate">{name}</span>}
		</div>
	);
}
