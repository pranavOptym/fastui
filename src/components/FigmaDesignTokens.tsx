'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  Button,
  Chip,
  Paper,
  Divider,
  Alert,
  LinearProgress,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { useTheme } from './ThemeProvider';

export const FigmaDesignTokens: React.FC = () => {
  const { currentTheme } = useTheme();

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Figma Design Tokens Demo
      </Typography>

      <Grid container spacing={4}>
        {/* Text Tokens */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Text Tokens
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
                    Primary Text (text.primary)
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    Secondary Text (text.secondary)
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                    Disabled Text (text.disabled)
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Primary Color Tokens */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Primary Color Tokens
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Chip 
                    label="Main" 
                    sx={{ 
                      backgroundColor: 'primary.main', 
                      color: 'primary.contrastText' 
                    }} 
                  />
                  <Chip 
                    label="Light" 
                    sx={{ 
                      backgroundColor: 'primary.light', 
                      color: 'primary.contrastText' 
                    }} 
                  />
                  <Chip 
                    label="Dark" 
                    sx={{ 
                      backgroundColor: 'primary.dark', 
                      color: 'primary.contrastText' 
                    }} 
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Chip 
                    label="Hover" 
                    sx={{ 
                      backgroundColor: 'action.hover',
                      color: 'text.primary' 
                    }} 
                  />
                  <Chip 
                    label="Selected" 
                    sx={{ 
                      backgroundColor: 'action.selected',
                      color: 'text.primary' 
                    }} 
                  />
                  <Chip 
                    label="Focus" 
                    sx={{ 
                      backgroundColor: 'action.focus',
                      color: 'text.primary' 
                    }} 
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Color System Tokens */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Color System Tokens
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Secondary</Typography>
                  <Stack spacing={1}>
                    <Chip label="Main" sx={{ backgroundColor: 'secondary.main', color: 'secondary.contrastText' }} />
                    <Chip label="Light" sx={{ backgroundColor: 'secondary.light', color: 'secondary.contrastText' }} />
                    <Chip label="Dark" sx={{ backgroundColor: 'secondary.dark', color: 'secondary.contrastText' }} />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Error</Typography>
                  <Stack spacing={1}>
                    <Chip label="Main" sx={{ backgroundColor: 'error.main', color: 'error.contrastText' }} />
                    <Chip label="Light" sx={{ backgroundColor: 'error.light', color: 'error.contrastText' }} />
                    <Chip label="Dark" sx={{ backgroundColor: 'error.dark', color: 'error.contrastText' }} />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Success</Typography>
                  <Stack spacing={1}>
                    <Chip label="Main" sx={{ backgroundColor: 'success.main', color: 'success.contrastText' }} />
                    <Chip label="Light" sx={{ backgroundColor: 'success.light', color: 'success.contrastText' }} />
                    <Chip label="Dark" sx={{ backgroundColor: 'success.dark', color: 'success.contrastText' }} />
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Background Tokens */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Background Tokens
              </Typography>
              <Stack spacing={2}>
                <Paper sx={{ p: 2, backgroundColor: 'background.default' }}>
                  <Typography variant="body2">Background Default</Typography>
                </Paper>
                <Paper sx={{ p: 2, backgroundColor: 'background.paper' }}>
                  <Typography variant="body2">Background Paper</Typography>
                </Paper>
                <Paper sx={{ p: 2, backgroundColor: 'action.disabledBackground' }}>
                  <Typography variant="body2">Disabled Background</Typography>
                </Paper>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Action Tokens */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Action Tokens
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Active State"
                  />
                </Box>
                <Box>
                  <Button variant="contained" sx={{ mr: 2 }}>
                    Hover Me
                  </Button>
                  <Button variant="outlined">
                    Focus Me
                  </Button>
                </Box>
                <Box>
                  <LinearProgress sx={{ mb: 1 }} />
                  <Typography variant="caption">Progress with action states</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Interactive Elements */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Interactive Elements with Design Tokens
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Buttons</Typography>
                  <Stack spacing={2}>
                    <Button variant="contained" fullWidth>
                      Primary Button
                    </Button>
                    <Button variant="outlined" fullWidth>
                      Outlined Button
                    </Button>
                    <Button variant="text" fullWidth>
                      Text Button
                    </Button>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Chips</Typography>
                  <Stack spacing={1}>
                    <Chip label="Default" />
                    <Chip label="Primary" color="primary" />
                    <Chip label="Secondary" color="secondary" />
                    <Chip label="Error" color="error" />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Alerts</Typography>
                  <Stack spacing={1}>
                    <Alert severity="info">Info Alert</Alert>
                    <Alert severity="success">Success Alert</Alert>
                    <Alert severity="warning">Warning Alert</Alert>
                    <Alert severity="error">Error Alert</Alert>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Design Token Values */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Design Token Values
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Text Opacity Values</Typography>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Primary:</Typography>
                      <Typography variant="body2" color="text.secondary">rgba(0, 0, 0, 0.87)</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Secondary:</Typography>
                      <Typography variant="body2" color="text.secondary">rgba(0, 0, 0, 0.6)</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Disabled:</Typography>
                      <Typography variant="body2" color="text.secondary">rgba(0, 0, 0, 0.38)</Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Action Opacity Values</Typography>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Hover:</Typography>
                      <Typography variant="body2" color="text.secondary">rgba(0, 0, 0, 0.04)</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Selected:</Typography>
                      <Typography variant="body2" color="text.secondary">rgba(0, 0, 0, 0.08)</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Focus:</Typography>
                      <Typography variant="body2" color="text.secondary">rgba(0, 0, 0, 0.12)</Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}; 