import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { Table } from './Table';
import type { TableColumn } from './Table';

interface Item {
	id: string;
	name: string;
	value: number;
}

const rows: Item[] = [
	{ id: '1', name: 'Item One', value: 10 },
	{ id: '2', name: 'Item Two', value: 20 },
];

const columns: TableColumn<Item>[] = [
	{
		key: 'name',
		label: 'Name',
		render: (row) => row.name,
	},
	{
		key: 'value',
		label: 'Value',
		render: (row) => row.value,
	},
];

const getRowKey = (row: Item) => row.id;

describe('Table', () => {
	it('renders column headers and rows', () => {
		render(<Table columns={columns} rows={rows} getRowKey={getRowKey} />);

		expect(
			screen.getByRole('columnheader', { name: 'Name' }),
		).toBeInTheDocument();

		expect(
			screen.getByRole('columnheader', { name: 'Value' }),
		).toBeInTheDocument();

		expect(screen.getAllByRole('row')).toHaveLength(3);

		const firstRow = screen.getByRole('row', {
			name: 'Item One 10',
		});

		expect(within(firstRow).getByText('Item One')).toBeInTheDocument();
		expect(within(firstRow).getByText('10')).toBeInTheDocument();

		const secondRow = screen.getByRole('row', {
			name: 'Item Two 20',
		});

		expect(within(secondRow).getByText('Item Two')).toBeInTheDocument();
		expect(within(secondRow).getByText('20')).toBeInTheDocument();
	});

	it('supports interactive custom cell content', async () => {
		const user = userEvent.setup();
		const onSelect = vi.fn();

		const actionColumns: TableColumn<Item>[] = [
			...columns,
			{
				key: 'actions',
				label: 'Actions',
				render: (row) => (
					<button onClick={() => onSelect(row)}>Select {row.name}</button>
				),
			},
		];

		render(<Table columns={actionColumns} rows={rows} getRowKey={getRowKey} />);

		await user.click(screen.getByRole('button', { name: 'Select Item Two' }));

		expect(onSelect).toHaveBeenCalledOnce();
		expect(onSelect).toHaveBeenCalledWith(rows[1]);
	});

	it('renders the default empty message', () => {
		render(<Table columns={columns} rows={[]} getRowKey={getRowKey} />);

		expect(screen.getByText('No data available.')).toBeInTheDocument();
		expect(screen.getAllByRole('row')).toHaveLength(2);
	});

	it('renders a custom empty message', () => {
		render(
			<Table
				columns={columns}
				rows={[]}
				getRowKey={getRowKey}
				emptyMessage="No items found."
			/>,
		);

		expect(screen.getByText('No items found.')).toBeInTheDocument();
		expect(screen.queryByText('No data available.')).not.toBeInTheDocument();
	});
});
