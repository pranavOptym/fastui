'use client';

import Image from "next/image";
import Link from "next/link";
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Grid, 
  Stack,
  Chip,
  Paper,
  Divider
} from "@mui/material";
import { useTheme as useCustomTheme } from "@/components/ThemeProvider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export default function Home() {
  const { currentTheme, setTheme } = useCustomTheme();

  const themes = [
    { id: 'light', name: 'Light', description: 'Light theme with design tokens', color: '#1976d2' },
    { id: 'dark', name: 'Dark', description: 'Dark theme with design tokens', color: '#90caf9' },
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0.02) 100%)',
      py: 4
    }}>
      <Container maxWidth="lg">
        <ThemeSwitcher />
        
        <Box sx={{ textAlign: { xs: 'center', sm: 'left' }, mb: 6 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 2,
              background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            FastUI - Optym UI Components
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ 
              mb: 4,
              maxWidth: 600,
              lineHeight: 1.4
            }}
          >
            AI-powered UI component library with customizable themes for modern frontend developers
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {themes.map((themeOption) => (
            <Grid item xs={12} sm={6} md={3} key={themeOption.id}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  border: currentTheme === themeOption.id ? 3 : 1,
                  borderColor: currentTheme === themeOption.id ? 'primary.main' : 'divider',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 8,
                    borderColor: 'primary.main',
                  },
                  height: '100%'
                }}
                onClick={() => setTheme(themeOption.id as typeof currentTheme)}
              >
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Box
                    sx={{ 
                      width: 60, 
                      height: 60, 
                      borderRadius: '50%',
                      backgroundColor: themeOption.color,
                      mx: 'auto',
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 2
                    }}
                  >
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                      {themeOption.name.charAt(0)}
                    </Typography>
                  </Box>
                  <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
                    {themeOption.name} Theme
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {themeOption.description}
                  </Typography>
                  {currentTheme === themeOption.id && (
                    <Chip 
                      label="Active" 
                      size="small" 
                      color="primary" 
                      sx={{ fontWeight: 600 }}
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper sx={{ p: 4, mb: 6, borderRadius: 3 }}>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3} 
            alignItems="center"
            justifyContent="center"
          >
            <Button
              component={Link}
              href="/routemax/components"
              variant="contained"
              size="large"
              startIcon={
                <Image
                  src="/next.svg"
                  alt="Next.js logo"
                  width={20}
                  height={20}
                />
              }
              sx={{ 
                px: 4, 
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                fontSize: '1.1rem'
              }}
            >
              View RMAX Components
            </Button>
            <Button
              component={Link}
              href="/routemax"
              variant="outlined"
              size="large"
              sx={{ 
                px: 4, 
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                fontSize: '1.1rem'
              }}
            >
              RMAX Button Demo
            </Button>
          </Stack>
        </Paper>

        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" component="h3" sx={{ mb: 3, fontWeight: 600 }}>
                  Available Themes
                </Typography>
                <Stack spacing={2}>
                  {themes.map((theme) => (
                    <Box key={theme.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{ 
                          width: 16, 
                          height: 16, 
                          borderRadius: '50%',
                          backgroundColor: theme.color,
                          flexShrink: 0
                        }}
                      />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {theme.name}:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {theme.description}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} lg={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" component="h3" sx={{ mb: 3, fontWeight: 600 }}>
                  Features
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Chip label="Material UI" color="primary" size="small" />
                    <Typography variant="body2">Modern design system</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Chip label="Theme Support" color="secondary" size="small" />
                    <Typography variant="body2">Multiple business unit themes</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Chip label="Responsive" color="success" size="small" />
                    <Typography variant="body2">Mobile-first design</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Chip label="TypeScript" color="info" size="small" />
                    <Typography variant="body2">Full type safety</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6 }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Learn More
          </Typography>
          <Stack direction="row" spacing={3} justifyContent="center" flexWrap="wrap">
            <Button
              component="a"
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={
                <Image
                  src="/file.svg"
                  alt="File icon"
                  width={16}
                  height={16}
                />
              }
              sx={{ textTransform: 'none', fontWeight: 500 }}
            >
              Learn
            </Button>
            <Button
              component="a"
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={
                <Image
                  src="/window.svg"
                  alt="Window icon"
                  width={16}
                  height={16}
                />
              }
              sx={{ textTransform: 'none', fontWeight: 500 }}
            >
              Examples
            </Button>
            <Button
              component="a"
              href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={
                <Image
                  src="/globe.svg"
                  alt="Globe icon"
                  width={16}
                  height={16}
                />
              }
              sx={{ textTransform: 'none', fontWeight: 500 }}
            >
              Go to nextjs.org →
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
