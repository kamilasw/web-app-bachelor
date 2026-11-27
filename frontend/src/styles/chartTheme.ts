import type { AgChartTheme } from 'ag-charts-community';

const defaultColors = [
	'var(--chart-1-default)',
	'var(--chart-2-default)',
	'var(--chart-3-default)',
	'var(--chart-4-default)',
	'var(--chart-5-default)',
];

const subtleColors = [
	'var(--chart-1-subtle)',
	'var(--chart-2-subtle)',
	'var(--chart-3-subtle)',
	'var(--chart-4-subtle)',
	'var(--chart-5-subtle)',
];

export const CHART_THEME: AgChartTheme = {
	baseTheme: 'ag-default',

	palette: {
		fills: defaultColors,
		strokes: defaultColors,
	},

	params: {
		backgroundColor: 'var(--semantic-surface)',
		foregroundColor: 'var(--semantic-text)',
		accentColor: 'var(--semantic-primary)',
		gridLineColor: 'var(--semantic-border)',
	},
};

export const CHART_SUBTLE_THEME: AgChartTheme = {
	...CHART_THEME,

	palette: {
		fills: subtleColors,
		strokes: defaultColors,
	},
};
