import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Select } from './Select';

const options = [
	{ value: 'option1', label: 'Option 1' },
	{ value: 'option2', label: 'Option 2' },
	{ value: 'option3', label: 'Option 3' },
];

describe('Select', () => {
	it('renders the label and options', () => {
		render(<Select label="Choose an option" options={options} />);

		expect(
			screen.getByRole('combobox', { name: 'Choose an option' }),
		).toBeInTheDocument();

		expect(screen.getAllByRole('option')).toHaveLength(3);
	});

	it('renders a disabled placeholder', () => {
		render(<Select label="Select" options={options} placeholder="Choose..." />);

		expect(screen.getByRole('option', { name: 'Choose...' })).toBeDisabled();
	});

	it('updates the selection and calls onChange', async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();

		render(<Select label="Select" options={options} onChange={onChange} />);

		const select = screen.getByRole('combobox');

		await user.selectOptions(select, 'option2');

		expect(select).toHaveValue('option2');
		expect(onChange).toHaveBeenCalledOnce();
	});

	it('supports a default value', () => {
		render(<Select label="Select" options={options} defaultValue="option2" />);

		expect(screen.getByRole('combobox')).toHaveValue('option2');
	});

	it('supports controlled values', () => {
		const onChange = vi.fn();

		const { rerender } = render(
			<Select
				label="Select"
				options={options}
				value="option1"
				onChange={onChange}
			/>,
		);

		expect(screen.getByRole('combobox')).toHaveValue('option1');

		rerender(
			<Select
				label="Select"
				options={options}
				value="option3"
				onChange={onChange}
			/>,
		);

		expect(screen.getByRole('combobox')).toHaveValue('option3');
	});

	it('supports disabled states', () => {
		render(
			<Select
				label="Select"
				disabled
				options={[
					{ value: 'option1', label: 'Option 1' },
					{ value: 'option2', label: 'Option 2', disabled: true },
				]}
			/>,
		);

		expect(screen.getByRole('combobox')).toBeDisabled();
		expect(screen.getByRole('option', { name: 'Option 2' })).toBeDisabled();
	});

	it('supports required fields', () => {
		render(<Select label="Select" options={options} required />);

		expect(screen.getByRole('combobox')).toBeRequired();
		expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
	});

	it('associates hints and errors with the select', () => {
		render(
			<Select
				label="Select"
				options={options}
				hint="Choose an available option"
				error="Selection is required"
			/>,
		);

		const select = screen.getByRole('combobox');

		expect(select).toHaveAttribute('aria-invalid', 'true');
		expect(select).toHaveAccessibleDescription(
			'Choose an available option Selection is required',
		);
	});

	it('applies compact and error styling', () => {
		render(
			<Select
				label="Select"
				options={options}
				compact
				error="Invalid selection"
			/>,
		);

		expect(screen.getByRole('combobox')).toHaveClass('h-8', 'border-danger');
	});
});
