import type { Meta, StoryObj } from '@storybook/react';
import GaugeChartOrbit, { GaugeChartOrbitProps } from './GaugeChartOrbit';

const meta: Meta<GaugeChartOrbitProps> = {
  title: 'Design System/Charts/GaugeChartOrbit',
  component: GaugeChartOrbit,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<GaugeChartOrbitProps>;

export const Pointer: Story = {
  args: {
    value: 65,
    min: 0,
    max: 120,
    label: 'Speed',
    subLabel: 'mph',
  },
};

export const Segments: Story = {
  args: {
    segments: [
      { value: 30, color: '#47A9F6' },
      { value: 20, color: '#FFCE56' },
      { value: 10, color: '#FF6384' },
    ],
    label: 'Usage',
  },
}; 