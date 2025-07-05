// Component interfaces for FastUI
import { ButtonProps as MuiButtonProps, SxProps, Theme } from "@mui/material"

export interface RmaxButtonProps extends Omit<MuiButtonProps, 'variant' | 'leftIcon' | 'rightIcon'> {
  variant?: 'primary' | 'outlined' | 'text'
  size?: MuiButtonProps['size']
  color?: MuiButtonProps['color']
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: "button" | "submit" | "reset"
  href?: string
  sx?: SxProps<Theme>
}

export interface RmaxTabBarAction {
  icon: React.ReactNode;
  onClick?: () => void;
  tooltip?: string;
  color?: string;
  hoverColor?: string;
  key?: string;
}

export interface RmaxTabBarActionsProps {
  actions: RmaxTabBarAction[];
  sx?: SxProps<Theme>;
  iconSize?: 'small' | 'medium' | 'large';
  gap?: number;
}