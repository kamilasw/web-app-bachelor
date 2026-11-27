interface MetricCardProps {
	label: string;
	value: number;
	description?: string;
	precision?: number;
}

export function MetricCard({
	label,
	value,
	description,
	precision = 2,
}: MetricCardProps) {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
			<p className="text-sm font-medium text-muted">{label}</p>

			<p className="text-4xl font-semibold text-foreground tabular-nums">
				{Number.isFinite(value) ? value.toFixed(precision) : 'N/A'}
			</p>

			{description && <p className="text-sm text-muted">{description}</p>}
		</div>
	);
}
