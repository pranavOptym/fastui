import type { Meta, StoryObj } from '@storybook/react';
import RmaxButton from './RmaxButton';

const meta: Meta<any> = {
  title: 'Design System/Routemax/RmaxButton',
  component: RmaxButton,
  tags: ['autodocs'],
  argTypes: { onClick: { action: 'clicked' } },
};
export default meta;

type Story = StoryObj<any>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Outlined Button',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Text Button',
  },
}; 