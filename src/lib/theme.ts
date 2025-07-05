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
      // Design tokens for light and dark themes
      designTokens?: {
        text: {
          primary: string;
          secondary: string;
          disabled: string;
        };
        primary: {
          main: string;
          dark: string;
          light: string;
          contrast: string;
          hover: string;
          selected: string;
          focus: string;
          focusVisible: string;
          outlinedBorder: string;
        };
        secondary: {
          main: string;
          dark: string;
          light: string;
          contrast: string;
        };
        error: {
          main: string;
          dark: string;
          light: string;
          contrast: string;
        };
        warning: {
          main: string;
          dark: string;
          light: string;
          contrast: string;
        };
        info: {
          main: string;
          dark: string;
          light: string;
          contrast: string;
        };
        success: {
          main: string;
          dark: string;
          light: string;
          contrast: string;
        };
        background: {
          default: string;
          paper: string;
          'paper-elevation-0': string;
          'paper-elevation-2': string;
          'paper-elevation-16': string;
          'paper-elevation-24': string;
        };
        action: {
          active: string;
          hover: string;
          selected: string;
          disabledBackground: string;
          focus: string;
          disabled: string;
        };
        divider: string;
        common: {
          white: string;
          black: string;
        };
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
      // Design tokens for light and dark themes
      designTokens?: {
        text: {
          primary: string;
          secondary: string;
          disabled: string;
        };
        primary: {
          main: string;
          dark: string;
          light: string;
          contrast: string;
          hover: string;
          selected: string;
          focus: string;
          focusVisible: string;
          outlinedBorder: string;
        };
        secondary: {
          main: string;
          dark: string;
          light: string;
          contrast: string;
        };
        error: {
          main: string;
          dark: string;
          light: string;
          contrast: string;
        };
        warning: {
          main: string;
          dark: string;
          light: string;
          contrast: string;
        };
        info: {
          main: string;
          dark: string;
          light: string;
          contrast: string;
        };
        success: {
          main: string;
          dark: string;
          light: string;
          contrast: string;
        };
        background: {
          default: string;
          paper: string;
          'paper-elevation-0': string;
          'paper-elevation-2': string;
          'paper-elevation-16': string;
          'paper-elevation-24': string;
        };
        action: {
          active: string;
          hover: string;
          selected: string;
          disabledBackground: string;
          focus: string;
          disabled: string;
        };
        divider: string;
        common: {
          white: string;
          black: string;
        };
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

// Light theme colors with design tokens
const lightColors = {
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
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    hover: 'rgba(0, 0, 0, 0.04)',
    selected: 'rgba(0, 0, 0, 0.08)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    focus: 'rgba(0, 0, 0, 0.12)',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
  divider: 'rgba(0, 0, 0, 0.12)',
  // Light theme design tokens
  custom: {
    designTokens: {
      text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.6)',
        disabled: 'rgba(0, 0, 0, 0.38)',
      },
      primary: {
        main: '#1976d2',
        dark: '#1565c0',
        light: '#42a5f5',
        contrast: '#ffffff',
        hover: 'rgba(25, 118, 210, 0.04)',
        selected: 'rgba(25, 118, 210, 0.08)',
        focus: 'rgba(25, 118, 210, 0.12)',
        focusVisible: 'rgba(25, 118, 210, 0.3)',
        outlinedBorder: 'rgba(25, 118, 210, 0.5)',
      },
      secondary: {
        main: '#9c27b0',
        dark: '#7b1fa2',
        light: '#ba68c8',
        contrast: '#ffffff',
      },
      error: {
        main: '#d32f2f',
        dark: '#c62828',
        light: '#ef5350',
        contrast: '#ffffff',
      },
      warning: {
        main: '#ed6c02',
        dark: '#e65100',
        light: '#ff9800',
        contrast: '#ffffff',
      },
      info: {
        main: '#0288d1',
        dark: '#01579b',
        light: '#03a9f4',
        contrast: '#ffffff',
      },
      success: {
        main: '#2e7d32',
        dark: '#1b5e20',
        light: '#4caf50',
        contrast: '#ffffff',
      },
      background: {
        default: '#ffffff',
        paper: '#ffffff',
        'paper-elevation-0': '#ffffff',
        'paper-elevation-2': 'rgba(255, 255, 255, 0.7)',
        'paper-elevation-16': 'rgba(255, 255, 255, 0.15)',
        'paper-elevation-24': 'rgba(255, 255, 255, 0.16)',
      },
      action: {
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.04)',
        selected: 'rgba(0, 0, 0, 0.08)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        focus: 'rgba(0, 0, 0, 0.12)',
        disabled: 'rgba(0, 0, 0, 0.38)',
      },
      divider: 'rgba(0, 0, 0, 0.12)',
      common: {
        white: '#ffffff',
        black: '#000000',
      },
    },
  },
};

// Dark theme colors with design tokens
const darkColors = {
  primary: {
    main: '#90caf9',
    light: '#e3f2fd',
    dark: '#42a5f5',
    contrastText: '#000000',
  },
  secondary: {
    main: '#ce93d8',
    light: '#f3e5f5',
    dark: '#ab47bc',
    contrastText: '#000000',
  },
  error: {
    main: '#f44336',
    light: '#e57373',
    dark: '#d32f2f',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#ffa726',
    light: '#ffb74d',
    dark: '#f57c00',
    contrastText: '#000000',
  },
  info: {
    main: '#29b6f6',
    light: '#4fc3f7',
    dark: '#0288d1',
    contrastText: '#000000',
  },
  success: {
    main: '#66bb6a',
    light: '#81c784',
    dark: '#388e3c',
    contrastText: '#000000',
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
    default: '#121212',
    paper: '#1e1e1e',
  },
  text: {
    primary: 'rgba(255, 255, 255, 0.87)',
    secondary: 'rgba(255, 255, 255, 0.6)',
    disabled: 'rgba(255, 255, 255, 0.38)',
  },
  action: {
    active: 'rgba(255, 255, 255, 0.54)',
    hover: 'rgba(255, 255, 255, 0.04)',
    selected: 'rgba(255, 255, 255, 0.08)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    focus: 'rgba(255, 255, 255, 0.12)',
    disabled: 'rgba(255, 255, 255, 0.38)',
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  // Dark theme design tokens
  custom: {
    designTokens: {
      text: {
        primary: 'rgba(255, 255, 255, 0.87)',
        secondary: 'rgba(255, 255, 255, 0.6)',
        disabled: 'rgba(255, 255, 255, 0.38)',
      },
      primary: {
        main: '#90caf9',
        dark: '#42a5f5',
        light: '#e3f2fd',
        contrast: '#000000',
        hover: 'rgba(144, 202, 249, 0.04)',
        selected: 'rgba(144, 202, 249, 0.08)',
        focus: 'rgba(144, 202, 249, 0.12)',
        focusVisible: 'rgba(144, 202, 249, 0.3)',
        outlinedBorder: 'rgba(144, 202, 249, 0.5)',
      },
      secondary: {
        main: '#ce93d8',
        dark: '#ab47bc',
        light: '#f3e5f5',
        contrast: '#000000',
      },
      error: {
        main: '#f44336',
        dark: '#d32f2f',
        light: '#e57373',
        contrast: '#ffffff',
      },
      warning: {
        main: '#ffa726',
        dark: '#f57c00',
        light: '#ffb74d',
        contrast: '#000000',
      },
      info: {
        main: '#29b6f6',
        dark: '#0288d1',
        light: '#4fc3f7',
        contrast: '#000000',
      },
      success: {
        main: '#66bb6a',
        dark: '#388e3c',
        light: '#81c784',
        contrast: '#000000',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
        'paper-elevation-0': '#1e1e1e',
        'paper-elevation-2': 'rgba(30, 30, 30, 0.7)',
        'paper-elevation-16': 'rgba(30, 30, 30, 0.15)',
        'paper-elevation-24': 'rgba(30, 30, 30, 0.16)',
      },
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)',
        disabled: 'rgba(255, 255, 255, 0.38)',
      },
      divider: 'rgba(255, 255, 255, 0.12)',
      common: {
        white: '#ffffff',
        black: '#000000',
      },
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
export const lightTheme = createBaseTheme(lightColors);
export const darkTheme = createBaseTheme(darkColors);

// Theme type
export type ThemeType = 'light' | 'dark';

// Theme mapping
export const themes: Record<ThemeType, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};

// Export design tokens for use in components
export { designTokens }; 