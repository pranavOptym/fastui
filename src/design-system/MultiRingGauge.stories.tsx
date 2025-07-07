import type { Meta, StoryObj } from '@storybook/react';
import MultiRingGauge, { MultiRingGaugeProps } from './MultiRingGauge';

const meta: Meta<MultiRingGaugeProps> = {
  title: 'Design System/Charts/MultiRingGauge',
  component: MultiRingGauge,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<MultiRingGaugeProps>;

export const Default: Story = {
  args: {
    rings: [
      { progress: 0.8, color: '#47A9F6' },
      { progress: 0.6, color: '#FFCE56' },
      { progress: 0.4, color: '#4BC0C0' },
    ],
    label: '3/5',
    subLabel: 'tasks',
  },
}; 