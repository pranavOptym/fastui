import type { Meta } from '@storybook/react';
import VerticalDividerGroup from './VerticalDividerGroup';
import { Typography } from '@mui/material';

const meta: Meta = {
  title: 'Design System/Utilities/VerticalDividerGroup',
  component: VerticalDividerGroup,
  tags: ['autodocs'],
};
export default meta;

export const Default = {
  render: () => (
    <VerticalDividerGroup dividerHeight={32}>
      <Typography variant="body1">Item One</Typography>
      <Typography variant="body1">Item Two</Typography>
      <Typography variant="body1">Item Three</Typography>
    </VerticalDividerGroup>
  ),
}; 