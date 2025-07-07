"use client"

import React from "react";
import { Tabs, Tab, Box, styled, TabsProps as MuiTabsProps, TabProps as MuiTabProps } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import RmaxTabBarActions from "./RmaxTabBarActions";
import { RmaxTabBarActionsProps } from "../component-interface";
import VerticalDividerGroup from "../VerticalDividerGroup";

// Custom props for the tab bar
export interface RmaxTabBarProps extends MuiTabsProps {
  /**
   * Array of tab labels or objects with label, icon, and value
   */
  tabs: Array<{
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    disabled?: boolean;
    sx?: SxProps<Theme>;
  }>;
  /**
   * The value of the currently selected tab
   */
  value: string | number;
  /**
   * Callback when a tab is selected
   */
  onChange: (event: React.SyntheticEvent, value: string | number) => void;
  /**
   * Optional: Show a settings icon on the right
   */
  showSettingsIcon?: boolean;
  /**
   * Optional: Callback for settings icon click
   */
  onSettingsClick?: () => void;
  /**
   * Optional: Custom right content (e.g., user menu)
   */
  rightContent?: React.ReactNode;
  /**
   * Optional: Custom left content (e.g., logo)
   */
  leftContent?: React.ReactNode;
  /**
   * Optional: sx for the root container
   */
  sx?: SxProps<Theme>;
  /**
   * Optional: Tab bar actions (settings, upload, help, cached)
   */
  actions?: RmaxTabBarActionsProps | undefined;
}

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 56,
  height: 56,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  '.MuiTabs-indicator': {
    backgroundColor: '#47A9F6',
    height: 4,
    borderRadius: 2,
    marginTop: -4,
  },
}));

const StyledTab = styled((props: MuiTabProps) => <Tab disableRipple {...props} />)(({ theme }) => ({
  minHeight: 56,
  height: 56,
  minWidth: 120,
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  fontFamily: 'Open Sans, Roboto, Helvetica, Arial, sans-serif',
  fontSize: 18,
  fontWeight: 400,
  color: '#9E9F9E',
  textTransform: 'none',
  letterSpacing: 0.2,
  display: 'flex',
  alignItems: 'center',
  '&.Mui-selected': {
    color: '#47A9F6',
    fontWeight: 600,
    background: 'transparent',
  },
  '&.Mui-disabled': {
    color: '#9E9F9E',
    opacity: 0.5,
  },
  '&:not(.Mui-selected):hover': {
    color: '#47A9F6',
    background: 'transparent',
  },
  transition: theme.custom?.transitions?.normal || 'all 0.2s',
}));

export const RmaxTabBar: React.FC<RmaxTabBarProps> = ({
  tabs,
  value,
  onChange,
  rightContent,
  leftContent,
  actions,
  sx,
  ...muiTabsProps
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: 56,
        maxHeight: 56,
        width: '100%',
        flex: 1,
        background: '#171d2c',
        px: 2,
        justifyContent: 'space-between',
        ...sx,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', flex: 1, width: '100%'}}>
      {leftContent && <Box sx={{ mr: 2 }}>{leftContent}</Box>}
      <StyledTabs
        value={value}
        onChange={onChange}
        {...muiTabsProps}
        TabIndicatorProps={{ children: <span /> }}
        sx={{ flex: 1, width: '100%' }}
      >
        {tabs.map((tab) => (
          <StyledTab
            key={tab.value}
            label={tab.label}
            {...(tab.icon ? { icon: tab.icon, iconPosition: 'start' as const } : {} as any)}
            value={tab.value}
            disabled={tab.disabled}
            sx={tab.sx}
          />
        ))}
      </StyledTabs>
      </div>
      <div style={{display: 'flex', alignItems: 'center'}}>
      <VerticalDividerGroup dividerHeight={32} dividerMargin={16}>
      {rightContent && <Box sx={{ ml: 2 }}>{rightContent}</Box>}
      {actions && (
        <Box sx={{ display: 'flex', alignItems: 'center', height: 56, gap: 1 }}>
          <RmaxTabBarActions {...actions} />
        </Box>
      )}
      </VerticalDividerGroup>
      </div>
    </Box>
  );
};

export default RmaxTabBar; 