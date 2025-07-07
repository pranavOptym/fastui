import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import RmaxTabBar, { RmaxTabBarProps } from './RmaxTabBar';

import { Upload, Settings } from '@mui/icons-material';

const meta: Meta<RmaxTabBarProps> = {
  title: 'Design System/Routemax/RmaxTabBar',
  component: RmaxTabBar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<RmaxTabBarProps>;

export const Default: Story = {
  render: (args: RmaxTabBarProps) => {
    const [value, setValue] = React.useState(args.value);
    return <RmaxTabBar {...args} value={value} onChange={(e, v) => setValue(v)} />;
  },
  args: {
    value: 'overview',
    tabs: [
      { label: 'Overview', value: 'overview' },
      { label: 'Details', value: 'details' },
      { label: 'Settings', value: 'settings', disabled: true },
    ],
    actions: {
      actions: [
        { icon: <Upload />, tooltip: 'Upload', onClick: () => {}, color: 'white', hoverColor: 'white' },
        { icon: <Settings />, tooltip: 'Settings', onClick: () => {}, color: 'white', hoverColor: 'white' },
      ],
      iconSize: 'small',
      gap: 1,
    },
  },
}; 