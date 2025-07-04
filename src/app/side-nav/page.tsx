"use client"

import { Box, Container, Typography, Card, CardContent, Grid, Paper, Chip } from "@mui/material"
import SideNavPanel from "@/components/SideNavPanel"
import { Button } from "@/components/Routemax/Button"
import RmaxButton from "@/components/Routemax/RmaxButton"
import { type NavItem } from "@/hooks/useNavState"
import { Star, ArrowForward, Favorite, Download, Settings } from "@mui/icons-material"
import { useNavState } from "@/hooks/useNavState"
import LivePlayground from "@/components/LivePlayground"
import ReactLiveEditor from "@/components/ReactLiveEditor"

  // Component Registry - Central place to manage all components
  const componentRegistry = {
    // Button Component
    "bu-1-design-buttons": {
      title: "RMAX Button Component",
      description: "A comprehensive, customizable button component with RMAX theme styling",
      theme: "theme-rmax",
      component: RmaxButton,
    documentation: {
      props: [
        { category: "Variants", items: ["contained", "outlined", "text", "soft", "gradient"] },
        { category: "Sizes", items: ["small", "medium", "large"] },
        { category: "Colors", items: ["primary", "secondary", "success", "warning", "error", "info"] },
        { category: "States", items: ["loading", "disabled", "fullWidth"] },
        { category: "Custom Classes", items: ["soft", "gradient", "glow"] },
        { category: "Animations", items: ["animateOnHover", "animateOnClick"] }
      ],

    }
  },

  // Form Component (placeholder for future implementation)
  "bu-1-design-forms": {
    title: "RMAX Form Component",
    description: "Form components with validation and RMAX theme styling",
    theme: "theme-rmax",
    component: null, // Will be implemented later
    documentation: {
      props: [
        { category: "Form Types", items: ["text", "email", "password", "select", "checkbox", "radio"] },
        { category: "Validation", items: ["required", "pattern", "minLength", "maxLength"] },
        { category: "States", items: ["error", "success", "loading", "disabled"] }
      ],

    }
  },

  // Login Page Component (placeholder)
  "bu-1-custom-login-page": {
    title: "Login Page Component",
    description: "A comprehensive login form with validation and theme support",
    theme: "theme-rmax",
    component: () => (
      <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2, color: 'primary.main' }}>
          Login Form
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <RmaxButton
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            leftIcon={<Star fontSize="small" />}
            rightIcon={<ArrowForward fontSize="small" />}
            className="glow"
          >
            Login with Google
          </RmaxButton>
          <RmaxButton
            variant="outlined"
            color="primary"
            size="medium"
            fullWidth
            leftIcon={<Favorite fontSize="small" />}
            onClick={() => alert("Like Button clicked!")}
          >
            Continue with Email
          </RmaxButton>
        </Box>
      </Box>
    ),
    documentation: {
      props: [
        { category: "Variants", items: ["solid", "outline", "text", "soft"] },
        { category: "Sizes", items: ["xs", "sm", "md", "lg", "xl"] },
        { category: "Colors", items: ["primary", "secondary", "success", "error", "warning"] },
        { category: "Validation", items: ["email format", "password strength", "required fields"] },
        { category: "States", items: ["loading", "error", "success"] }
      ],
    }
  }
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
            children: [
              { id: "bu-1-design-buttons-props", label: "Props" },
              { id: "bu-1-design-buttons-description", label: "Description" },
            ]
          },
          {
            id: "bu-1-design-forms",
            label: "Forms",
            children: [
              { id: "bu-1-design-forms-props", label: "Props" },
              { id: "bu-1-design-forms-description", label: "Description" },
            ]
          },
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
            id: "bu-2-design-charts",
            label: "Charts & Analytics",
            children: [
              { id: "bu-2-design-charts-line", label: "Line Chart" },
              { id: "bu-2-design-charts-bar", label: "Bar Chart" },
            ]
          },
        ]
      }
    ]
  },
]

// Generic Component Renderer
const ComponentRenderer = ({ componentId }: { componentId: string }) => {
  const componentData = componentRegistry[componentId as keyof typeof componentRegistry]
  
  if (!componentData) {
    return (
      <Card sx={{ p: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h2" sx={{ mb: 2, color: 'text.primary' }}>
            Component Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This component has not been implemented yet.
          </Typography>
        </CardContent>
      </Card>
    )
  }

  const { title, description, documentation } = componentData

  return (
    <Box sx={{ p: 3, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h3" component="h1" sx={{ mb: 1, color: 'primary.main', fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        {description}
      </Typography>
      <ReactLiveEditor componentType={'button'} />
    </Box>
  )
}

export default function SideNavDemo() {
  const { activeItem, setActive, findItem } = useNavState(navData)

  const handleItemSelect = (item: NavItem) => {
    setActive(item.id)
    console.log("Selected item:", item)
    
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
      const { title, description, documentation } = componentData;
      return (
      <div>
        <Box sx={{ p: 3, height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Typography variant="h3" component="h1" sx={{ mb: 1, color: 'primary.main', fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            {description}
          </Typography>
          <ReactLiveEditor componentType={'button'} />
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
        <Container maxWidth="xl" sx={{ py: 4, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          {renderComponent()}
        </Container>
      </Box>
    </Box>
  )
} 