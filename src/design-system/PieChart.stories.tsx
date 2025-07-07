import type { Meta, StoryObj } from '@storybook/react';
import PieChart, { PieChartProps } from './PieChart';

const meta: Meta<PieChartProps> = {
  title: 'Design System/Charts/PieChart',
  component: PieChart,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<PieChartProps>;

export const Default: Story = {
  args: {
    segments: [
      { value: 50, color: '#47A9F6' },
      { value: 30, color: '#FFCE56' },
      { value: 20, color: '#FF6384' },
    ],
    label: 'Report',
  },
}; 