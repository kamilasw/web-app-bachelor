import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Slider } from './Slider';

describe('Slider', () => {
	it('renders with an accessible label', () => {
		render(<Slider label="Value" />);

		expect(screen.getByRole('slider', { name: 'Value' })).toBeInTheDocument();
	});

	it('uses default bounds and step', () => {
		render(<Slider label="Value" />);

		const slider = screen.getByRole('slider');

		expect(slider).toHaveAttribute('min', '0');
		expect(slider).toHaveAttribute('max', '100');
		expect(slider).toHaveAttribute('step', '1');
		expect(slider).toHaveValue('0');
	});

	it('supports custom bounds and default value', () => {
		render(
			<Slider label="Value" min={10} max={90} step={5} defaultValue={30} />,
		);

		const slider = screen.getByRole('slider');

		expect(slider).toHaveValue('30');
		expect(slider).toHaveAttribute('min', '10');
		expect(slider).toHaveAttribute('max', '90');
		expect(slider).toHaveAttribute('step', '5');
		expect(screen.getByText('30')).toBeInTheDocument();
	});

	it('updates its displayed value when changed', () => {
		render(<Slider label="Value" defaultValue={20} />);

		const slider = screen.getByRole('slider');

		fireEvent.change(slider, { target: { value: '45' } });

		expect(slider).toHaveValue('45');
		expect(screen.getByText('45')).toBeInTheDocument();
	});

	it('calls onChange when the value changes', () => {
		const onChange = vi.fn();

		render(<Slider label="Value" onChange={onChange} />);

		fireEvent.change(screen.getByRole('slider'), {
			target: { value: '50' },
		});

		expect(onChange).toHaveBeenCalledOnce();
	});

	it('supports controlled values', () => {
		const onChange = vi.fn();

		const { rerender } = render(
			<Slider label="Value" value={20} onChange={onChange} />,
		);

		expect(screen.getByRole('slider')).toHaveValue('20');

		rerender(<Slider label="Value" value={60} onChange={onChange} />);

		expect(screen.getByRole('slider')).toHaveValue('60');
		expect(screen.getByText('60')).toBeInTheDocument();
	});

	it('supports disabled states', () => {
		render(<Slider label="Value" disabled />);

		expect(screen.getByRole('slider')).toBeDisabled();
	});

	it('associates hint text with the slider', () => {
		render(<Slider label="Value" hint="Adjust the value" />);

		expect(screen.getByRole('slider')).toHaveAccessibleDescription(
			'Adjust the value',
		);
	});

	it('supports custom attributes and CSS classes', () => {
		render(<Slider label="Value" name="value" className="custom-class" />);

		const slider = screen.getByRole('slider');

		expect(slider).toHaveAttribute('name', 'value');
		expect(slider).toHaveClass('custom-class');
	});
});
