import type { Meta, StoryObj } from '@storybook/react-vite';

import { Table } from './Table';
import type { TableColumn } from './Table';
import { Button } from '../Button/Button';

interface Item {
	id: string;
	name: string;
	value: number;
}

const rows: Item[] = [
	{ id: '1', name: 'Item One', value: 10 },
	{ id: '2', name: 'Item Two', value: 20 },
	{ id: '3', name: 'Item Three', value: 30 },
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

const meta = {
	title: 'UI/Table',
	component: Table<Item>,
	tags: ['autodocs'],
	args: {
		columns,
		rows,
		getRowKey: (row) => row.id,
	},
} satisfies Meta<typeof Table<Item>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
	args: {
		rows: [],
	},
};

export const CustomEmptyMessage: Story = {
	args: {
		rows: [],
		emptyMessage: 'No matching items found.',
	},
};

export const WithActions: Story = {
	args: {
		columns: [
			...columns,
			{
				key: 'actions',
				label: 'Actions',
				render: () => (
					<Button appearance="subtle" size="sm">
						View
					</Button>
				),
			},
		],
	},
};
