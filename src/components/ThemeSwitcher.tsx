'use client';

import React from 'react';
import { 
  Box, 
  ToggleButton, 
  ToggleButtonGroup, 
  Typography,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import { useTheme as useCustomTheme } from './ThemeProvider';

const themes = [
  { id: 'light', name: 'Light', color: '#1976d2', description: 'Light theme with design tokens' },
  { id: 'dark', name: 'Dark', color: '#90caf9', description: 'Dark theme with design tokens' },
];

export const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setTheme } = useCustomTheme();

  const handleThemeChange = (
    event: React.MouseEvent<HTMLElement>,
    newTheme: string | null,
  ) => {
    if (newTheme !== null) {
      setTheme(newTheme as typeof currentTheme);
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
          Theme Switcher
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Switch between different business unit themes to see how components adapt
        </Typography>
        
        <ToggleButtonGroup
          value={currentTheme}
          exclusive
          onChange={handleThemeChange}
          aria-label="theme selection"
          size="small"
          sx={{ mb: 2 }}
        >
          {themes.map((theme) => (
            <ToggleButton key={theme.id} value={theme.id} aria-label={theme.name}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    backgroundColor: theme.color,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                />
                <Typography variant="body2">{theme.name}</Typography>
              </Stack>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Typography variant="caption" color="text.secondary">
          Current theme: <strong>{themes.find(t => t.id === currentTheme)?.name}</strong>
        </Typography>
      </CardContent>
    </Card>
  );
}; 