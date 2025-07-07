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

export interface RmaxGridProps {
  /**
   * Column definitions for AG Grid. If not provided, a default 3-column grid is shown.
   */
  columns?: any[];
  /**
   * Row data for AG Grid. If not provided, a default 2-row grid is shown.
   */
  rows?: any[];
  /**
   * Callback when row data changes (e.g. add/remove row/col). Receives new row data.
   */
  onRowsChange?: (rows: any[]) => void;
  /**
   * Callback when column definitions change (e.g. add/remove col). Receives new columns.
   */
  onColumnsChange?: (columns: any[]) => void;
  /**
   * Hide the built-in toolbar (for full custom control)
   */
  hideToolbar?: boolean;
  /**
   * Height of the grid (default 400)
   */
  height?: number | string;
  /**
   * Any extra props for AgGridReact
   */
  agGridProps?: any;
}