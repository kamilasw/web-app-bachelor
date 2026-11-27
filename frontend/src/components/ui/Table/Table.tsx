import type { ReactNode } from 'react';

export interface TableColumn<T> {
	key: string;
	label: string;
	render: (row: T) => ReactNode;
}

export interface TableProps<T> {
	columns: TableColumn<T>[];
	rows: T[];
	getRowKey: (row: T) => string;
	emptyMessage?: string;
}

export function Table<T>({
	columns,
	rows,
	getRowKey,
	emptyMessage = 'No data available.',
}: TableProps<T>) {
	return (
		<div className="w-full overflow-x-auto">
			<table className="w-full border-collapse text-left text-sm">
				<thead className="border-b-2 border-default">
					<tr>
						{columns.map((column) => (
							<th
								key={column.key}
								scope="col"
								className="px-4 py-3 font-medium text-muted"
							>
								{column.label}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{rows.map((row) => (
						<tr
							key={getRowKey(row)}
							className="border-b border-default hover:bg-neutral-hover"
						>
							{columns.map((column) => (
								<td key={column.key} className="px-4 py-3">
									{column.render(row)}
								</td>
							))}
						</tr>
					))}

					{rows.length === 0 && (
						<tr>
							<td
								colSpan={columns.length}
								className="px-4 py-8 text-center text-muted"
							>
								{emptyMessage}
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
