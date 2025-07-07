"use client"

import { Box, Container, Typography, Card, CardContent, Grid, Paper, Chip, Button } from "@mui/material"
import SideNavPanel from "@/components/SideNavPanel"
import { type NavItem } from "@/hooks/useNavState"
import { useNavState } from "@/hooks/useNavState"
import ReactLiveEditor from "@/components/ReactLiveEditor"
import RmaxGrid from "@/design-system/Routemax/RmaxGrid"
import { useRouter } from "next/navigation"

  // Component Registry - Central place to manage all components
  const componentRegistry = {
    // Button Component
    "bu-1-design-buttons": {
      title: "RMAX Button Component",
      description: "A comprehensive, customizable button component with RMAX theme styling",
      theme: "theme-rmax",
      componentName: 'button',
      component: null,
  },

  // Form Component (placeholder for future implementation)
  "bu-1-design-tabBar": {
    title: "RMAX Tab Bar Component",
    description: "Tab bar components with validation",
    theme: "theme-rmax",
    componentName: 'tabBar',
    component: null,
  },

  "bu-1-design-verticalDividerGroup": {
    title: "optym Vertical Divider Group Component",
    description: "Vertical divider group components with validation",
    theme: "theme-optym",
    componentName: 'verticalDividerGroup', // Will be implemented later
    component: null,
  },

  "bu-1-design-grid": {
    title: "RMAX Grid Component",
    description: "A comprehensive, customizable grid component with RMAX theme styling",
    theme: "theme-rmax",
    componentName: 'grid',
    component: null,
  },
  // NEW: Donut Chart Component
  "bu-1-design-donutChart": {
    title: "Donut Chart Component",
    description: "A customizable donut chart component for data visualization",
    theme: "theme-rmax",
    componentName: 'donutChart',
    component: null,
  },
  // NEW: Pie Chart Component
  "bu-1-design-pieChart": {
    title: "Pie Chart Component",
    description: "A simple pie chart component for proportional data",
    theme: "theme-rmax",
    componentName: 'pieChart',
    component: null,
  },
  // NEW: Multi Ring Gauge Component
  "bu-1-design-multiRingGauge": {
    title: "Multi Ring Gauge Component",
    description: "A gauge chart with multiple rings to represent various KPIs",
    theme: "theme-rmax",
    componentName: 'multiRingGauge',
    component: null,
  },
  // NEW: Slider Chart Component
  "bu-1-design-sliderChart": {
    title: "Slider Chart Component",
    description: "Interactive slider chart for metric selection",
    theme: "theme-rmax",
    componentName: 'sliderChart',
    component: null,
  },
}

const navData = [
  {
    id: "bu-1",
    label: "Routemax",
    children: [
      {
        id: "bu-1-design",
        label: "Design Components",
        children: [
          {
            id: "bu-1-design-buttons",
            label: "Buttons",
          },
          {
            id: "bu-1-design-tabBar",
            label: "Tab Bar",
          },
          {
            id: "bu-1-design-verticalDividerGroup",
            label: "Vertical Divider Group",
          },
          {
            id: "bu-1-design-grid",
            label: "Grid",
          },
          // NEW NAV ITEMS
          { id: "bu-1-design-donutChart", label: "Donut Chart" },
          { id: "bu-1-design-pieChart", label: "Pie Chart" },
          { id: "bu-1-design-multiRingGauge", label: "Multi Ring Gauge" },
          { id: "bu-1-design-sliderChart", label: "Slider Chart" }
        ]
      },
      {
        id: "bu-1-custom",
        label: "Custom Components",
        children: [
          { id: "bu-1-custom-login-page", label: "Login Page" },
        ]
      }
    ]
  },
  {
    id: "bu-2",
    label: "LoadAI",
    children: [
      {
        id: "bu-2-design",
        label: "Design Components",
        children: [
          {
            id: "bu-2-line-charts",
            label: "Line Chart",
          },
        ]
      }
    ]
  },
]

export default function SideNavDemo() {
  const { activeItem, setActive, findItem } = useNavState(navData)
  const router = useRouter()

  const handleItemSelect = (item: NavItem) => {
    setActive(item.id)
    
    // Set theme based on selected component
    if (componentRegistry[item.id as keyof typeof componentRegistry]) {
      // Debug: Check CSS variables
      setTimeout(() => {
        const root = document.documentElement
        const primary500 = getComputedStyle(root).getPropertyValue('--primary-500')
        console.log("CSS variable --primary-500:", primary500)
      }, 100)
    } else {
      console.log("No theme applied")
    }
  }

  const renderComponent = () => {
    if (!activeItem) {
      return (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '60vh',
          textAlign: 'center'
        }}>
          <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
            Welcome to FastUI
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Select a component from the navigation to view its details
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Chip label="Material UI" color="primary" variant="outlined" />
            <Chip label="Theme Support" color="secondary" variant="outlined" />
            <Chip label="Responsive" color="success" variant="outlined" />
          </Box>
        </Box>
      )
    }

    const selectedItem = findItem(activeItem)

    // Check if the selected item has a component in the registry
    if (componentRegistry[activeItem as keyof typeof componentRegistry]) {
      const componentId = activeItem;
      const componentData = componentRegistry[componentId as keyof typeof componentRegistry];
      const { title, description, component, componentName } = componentData;
      
      return (
      <div>
        <Box sx={{ p: 3, height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Typography variant="h3" component="h1" sx={{ mb: 1, color: 'primary.main', fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            {description}
          </Typography>
          {component ? component : <ReactLiveEditor componentType={componentName as any} />}
        </Box>
        </div>
      )
    }

    // Default content for other items
    return (
      <Card sx={{ p: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h2" sx={{ mb: 2, color: 'text.primary', fontWeight: 'bold' }}>
            {selectedItem?.label || 'Unknown Item'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Component details for {selectedItem?.label || 'Unknown Item'} will be displayed here.
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', minHeight: 0 }}>
      <SideNavPanel data={navData} onItemSelect={handleItemSelect}/>
      <Box sx={{ flex: 1, overflow: 'auto', bgcolor: 'background.default', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {/* Header */}
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button variant="contained" onClick={() => router.push('/playground')}>Playground</Button>
        </Box>
        <Container maxWidth="xl" sx={{ py: 4, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          {renderComponent()}
        </Container>
      </Box>
    </Box>
  )
} 