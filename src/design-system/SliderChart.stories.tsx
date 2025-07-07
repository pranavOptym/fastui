import type { Meta, StoryObj } from '@storybook/react';
import SliderChart, { SliderChartProps } from './SliderChart';

const meta: Meta<SliderChartProps> = {
  title: 'Design System/Charts/SliderChart',
  component: SliderChart,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<SliderChartProps>;

export const Default: Story = {
  args: {
    value: 45,
    min: 0,
    max: 100,
    label: 'Score',
  },
}; 