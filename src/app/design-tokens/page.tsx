"use client"

import { Box, Container, Typography, Card, CardContent, Grid, Stack, Paper, Divider, Button } from "@mui/material"
import { Star, ArrowForward, Favorite, Download, Settings, Home } from "@mui/icons-material"
import { useDesignTokens } from "@/hooks/useDesignTokens"
import { useTheme } from "@/components/ThemeProvider"
import { FigmaDesignTokens } from "@/components/FigmaDesignTokens"
import Link from "next/link"
import RmaxButton from "@/design-system/Routemax/RmaxButton"

export default function DesignTokensDemo() {
  const tokens = useDesignTokens()
  const { currentTheme, setTheme } = useTheme()

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: `linear-gradient(135deg, ${tokens?.designTokens?.primary?.hover || 'rgba(25, 118, 210, 0.04)'} 0%, rgba(255, 255, 255, 0.02) 100%)`,
      py: 4
    }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <RmaxButton
              variant="outlined"
              leftIcon={<Home fontSize="small" />}
              sx={{ mb: 2 }}
            >
              Back to Home
            </RmaxButton>
          </Link>
          
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
            Design Tokens Demo
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Explore reusable design tokens across themes and components
          </Typography>

          {/* Theme Switcher */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Current Theme: {currentTheme.toUpperCase()}
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {['light', 'dark'].map((theme) => (
                <Button
                  key={theme}
                  variant={currentTheme === theme ? "contained" : "outlined"}
                  onClick={() => setTheme(theme as any)}
                  sx={{ textTransform: 'capitalize' }}
                >
                  {theme}
                </Button>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* Figma Design Tokens Demo */}
        <FigmaDesignTokens />

        <Grid container spacing={4}>
          {/* Design Tokens Overview */}
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
                  Available Design Tokens
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                        Global Tokens
                      </Typography>
                      <Stack spacing={1}>
                        <Typography variant="body2">
                          <strong>Shadows:</strong> sm, md, lg, xl
                        </Typography>
                        <Typography variant="body2">
                          <strong>Border Radius:</strong> none, sm, md, lg, xl, full
                        </Typography>
                        <Typography variant="body2">
                          <strong>Spacing:</strong> xs, sm, md, lg, xl
                        </Typography>
                        <Typography variant="body2">
                          <strong>Transitions:</strong> fast, normal, slow
                        </Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                        Theme-Specific Tokens
                      </Typography>
                      <Stack spacing={1}>
                        <Typography variant="body2">
                          <strong>Gradients:</strong> primary, primaryHover
                        </Typography>
                        <Typography variant="body2">
                          <strong>Soft:</strong> primary, primaryHover, primaryBorder
                        </Typography>
                        <Typography variant="body2">
                          <strong>Glow:</strong> primary
                        </Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Button Variants */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
                  Button Variants Using Tokens
                </Typography>
                <Stack spacing={2}>
                  <RmaxButton variant="contained" color="primary" fullWidth>
                    Standard Contained
                  </RmaxButton>
                  <RmaxButton variant="outlined" color="primary" fullWidth>
                    <RmaxButton variant="outlined" color="primary" fullWidth>
                      Standard Outlined
                    </RmaxButton>
                    Standard Outlined
                  </RmaxButton>
                  <RmaxButton className="soft" fullWidth>
                    Soft Variant (Theme Token)
                  </RmaxButton>
                  <RmaxButton className="gradient" fullWidth>
                    Gradient Variant (Theme Token)
                  </RmaxButton>
                  <RmaxButton className="glow" fullWidth>
                    Glow Effect (Theme Token)
                  </RmaxButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Shadow Examples */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
                  Shadow Tokens
                </Typography>
                <Stack spacing={2}>
                  <Paper sx={{ p: 2, boxShadow: tokens?.shadows?.sm }}>
                    Small Shadow
                  </Paper>
                  <Paper sx={{ p: 2, boxShadow: tokens?.shadows?.md }}>
                    Medium Shadow
                  </Paper>
                  <Paper sx={{ p: 2, boxShadow: tokens?.shadows?.lg }}>
                    Large Shadow
                  </Paper>
                  <Paper sx={{ p: 2, boxShadow: tokens?.shadows?.xl }}>
                    Extra Large Shadow
                  </Paper>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Border Radius Examples */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
                  Border Radius Tokens
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    borderRadius: tokens?.borderRadius?.none
                  }}>
                    No Border Radius
                  </Box>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    borderRadius: tokens?.borderRadius?.sm
                  }}>
                    Small Border Radius
                  </Box>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    borderRadius: tokens?.borderRadius?.md
                  }}>
                    Medium Border Radius
                  </Box>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    borderRadius: tokens?.borderRadius?.lg
                  }}>
                    Large Border Radius
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Gradient Examples */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
                  Gradient Tokens
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ 
                    p: 3, 
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    color: 'white',
                    borderRadius: tokens?.borderRadius?.md,
                    textAlign: 'center'
                  }}>
                    Primary Gradient
                  </Box>
                  <Box sx={{ 
                    p: 3, 
                    background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                    color: 'white',
                    borderRadius: tokens?.borderRadius?.md,
                    textAlign: 'center'
                  }}>
                    Primary Hover Gradient
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6 }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Benefits of Design Tokens
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Consistency
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Reusable tokens ensure consistent spacing, colors, and effects across all components
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Maintainability
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Change tokens once and update across the entire application
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Theme Support
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Each business unit can have its own design tokens while maintaining the same structure
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
} 