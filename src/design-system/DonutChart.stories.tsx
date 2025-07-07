import type { Meta, StoryObj } from '@storybook/react';
import DonutChart, { DonutChartProps } from './DonutChart';

const meta: Meta<DonutChartProps> = {
  title: 'Design System/Charts/DonutChart',
  component: DonutChart,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<DonutChartProps>;

export const Default: Story = {
  args: {
    segments: [
      { value: 40, color: '#FF6384' },
      { value: 30, color: '#36A2EB' },
      { value: 20, color: '#FFCE56' },
      { value: 10, color: '#4BC0C0' },
    ],
    size: 200,
    label: '100',
    subLabel: 'Total',
  },
}; 