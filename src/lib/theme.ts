import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';

// Extend Theme type to include custom design tokens
declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      shadows: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
      borderRadius: {
        none: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        full: number;
      };
      spacing: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
      };
      transitions: {
        fast: string;
        normal: string;
        slow: string;
      };
      gradients?: {
        primary: string;
        primaryHover: string;
      };
      soft?: {
        primary: string;
        primaryHover: string;
        primaryBorder: string;
      };
      glow?: {
        primary: string;
      };
    };
  }
  interface ThemeOptions {
    custom?: {
      shadows: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
      borderRadius: {
        none: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        full: number;
      };
      spacing: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
      };
      transitions: {
        fast: string;
        normal: string;
        slow: string;
      };
      gradients?: {
        primary: string;
        primaryHover: string;
      };
      soft?: {
        primary: string;
        primaryHover: string;
        primaryBorder: string;
      };
      glow?: {
        primary: string;
      };
    };
  }
}

// Design tokens - reusable across all components
const designTokens = {
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  // Border radius
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  // Transitions
  transitions: {
    fast: '0.15s ease-in-out',
    normal: '0.2s ease-in-out',
    slow: '0.3s ease-in-out',
  },
};

// Root theme colors
const rootColors = {
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#9c27b0',
    light: '#ba68c8',
    dark: '#7b1fa2',
    contrastText: '#ffffff',
  },
  error: {
    main: '#d32f2f',
    light: '#ef5350',
    dark: '#c62828',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#ed6c02',
    light: '#ff9800',
    dark: '#e65100',
    contrastText: '#ffffff',
  },
  info: {
    main: '#0288d1',
    light: '#03a9f4',
    dark: '#01579b',
    contrastText: '#ffffff',
  },
  success: {
    main: '#2e7d32',
    light: '#4caf50',
    dark: '#1b5e20',
    contrastText: '#ffffff',
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  background: {
    default: '#ffffff',
    paper: '#ffffff',
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
  },
};

// RMAX theme colors with design tokens
const rmaxColors = {
  primary: {
    main: '#00bcd4',
    light: '#4dd0e1',
    dark: '#0097a7',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#2196f3',
    light: '#64b5f6',
    dark: '#1976d2',
    contrastText: '#ffffff',
  },
  background: {
    default: '#ffffff',
    paper: '#ffffff',
  },
  text: {
    primary: '#00bcd4',
    secondary: 'rgba(0, 188, 212, 0.7)',
  },
  // RMAX-specific design tokens
  custom: {
    // Gradients
    gradients: {
      primary: 'linear-gradient(45deg, #00bcd4 30%, #4dd0e1 90%)',
      primaryHover: 'linear-gradient(45deg, #00bcd4 40%, #0097a7 100%)',
    },
    // Soft backgrounds
    soft: {
      primary: 'rgba(0, 188, 212, 0.1)',
      primaryHover: 'rgba(0, 188, 212, 0.18)',
      primaryBorder: 'rgba(0, 188, 212, 0.2)',
    },
    // Glow effects
    glow: {
      primary: '0 0 20px rgba(0, 188, 212, 0.3)',
    },
  },
};

// LoadAI theme colors with design tokens
const loadaiColors = {
  primary: {
    main: '#ff9800',
    light: '#ffb74d',
    dark: '#f57c00',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#795548',
    light: '#a1887f',
    dark: '#5d4037',
    contrastText: '#ffffff',
  },
  background: {
    default: '#fff8e1',
    paper: '#ffffff',
  },
  text: {
    primary: '#e65100',
    secondary: 'rgba(230, 81, 0, 0.7)',
  },
  // LoadAI-specific design tokens
  custom: {
    gradients: {
      primary: 'linear-gradient(45deg, #ff9800 30%, #ffb74d 90%)',
      primaryHover: 'linear-gradient(45deg, #ff9800 40%, #f57c00 100%)',
    },
    soft: {
      primary: 'rgba(255, 152, 0, 0.1)',
      primaryHover: 'rgba(255, 152, 0, 0.18)',
      primaryBorder: 'rgba(255, 152, 0, 0.2)',
    },
    glow: {
      primary: '0 0 20px rgba(255, 152, 0, 0.3)',
    },
  },
};

// Optym theme colors with design tokens
const optymColors = {
  primary: {
    main: '#4caf50',
    light: '#81c784',
    dark: '#388e3c',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#009688',
    light: '#4db6ac',
    dark: '#00796b',
    contrastText: '#ffffff',
  },
  background: {
    default: '#f1f8e9',
    paper: '#ffffff',
  },
  text: {
    primary: '#2e7d32',
    secondary: 'rgba(46, 125, 50, 0.7)',
  },
  // Optym-specific design tokens
  custom: {
    gradients: {
      primary: 'linear-gradient(45deg, #4caf50 30%, #81c784 90%)',
      primaryHover: 'linear-gradient(45deg, #4caf50 40%, #388e3c 100%)',
    },
    soft: {
      primary: 'rgba(76, 175, 80, 0.1)',
      primaryHover: 'rgba(76, 175, 80, 0.18)',
      primaryBorder: 'rgba(76, 175, 80, 0.2)',
    },
    glow: {
      primary: '0 0 20px rgba(76, 175, 80, 0.3)',
    },
  },
};

// Create base theme configuration
const createBaseTheme = (colors: Partial<ThemeOptions['palette']> & { custom?: any }) => createTheme({
  palette: {
    ...colors,
    mode: 'light',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 300,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 300,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 400,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 400,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 400,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: designTokens.borderRadius.md,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.md,
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
          transition: designTokens.transitions.normal,
          '&:hover': {
            boxShadow: designTokens.shadows.md,
          },
        },
        contained: {
          '&:hover': {
            boxShadow: designTokens.shadows.md,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.lg,
          boxShadow: designTokens.shadows.md,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.md,
        },
      },
    },
  },
  // Extend theme with custom design tokens
  custom: {
    ...designTokens,
    ...colors.custom,
  },
});

// Export themes
export const rootTheme = createBaseTheme(rootColors);
export const rmaxTheme = createBaseTheme(rmaxColors);
export const loadaiTheme = createBaseTheme(loadaiColors);
export const optymTheme = createBaseTheme(optymColors);

// Theme type
export type ThemeType = 'root' | 'rmax' | 'loadai' | 'optym';

// Theme mapping
export const themes: Record<ThemeType, Theme> = {
  root: rootTheme,
  rmax: rmaxTheme,
  loadai: loadaiTheme,
  optym: optymTheme,
};

// Export design tokens for use in components
export { designTokens }; 