import type { Meta } from '@storybook/react';
import RmaxTabBarActions from './RmaxTabBarActions';
import UploadIcon from '@mui/icons-material/Upload';
import SettingsIcon from '@mui/icons-material/Settings';

const meta: Meta = {
  title: 'Design System/Routemax/RmaxTabBarActions',
  component: RmaxTabBarActions,
  tags: ['autodocs'],
  argTypes: {
    actions: { control: { type: 'object' } },
  },
};
export default meta;

export const Default = {
  args: {
    actions: [
      { icon: <UploadIcon />, tooltip: 'Upload', onClick: () => {} },
      { icon: <SettingsIcon />, tooltip: 'Settings', onClick: () => {} },
    ],
  },
}; 