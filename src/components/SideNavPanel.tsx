"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  styled,
  Divider,
  Avatar
} from "@mui/material"
import { 
  ChevronRight, 
  Folder, 
  InsertDriveFile, 
  Business,
  Palette
} from "@mui/icons-material"
import { useNavState, type NavItem } from "@/hooks/useNavState"

interface SideNavPanelProps {
  data: NavItem[]
  className?: string
  onItemSelect?: (item: NavItem) => void
}

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  width: 280,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  borderRadius: 0,
  borderRight: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[4],
  background: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
}));

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => !['level', 'isActive'].includes(prop as string),
})<{ level?: number; isActive?: boolean }>(({ theme, level = 0, isActive }) => ({
  paddingLeft: theme.spacing(2 + level * 2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  margin: theme.spacing(0.5, 1),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.primary.light + '15',
    color: theme.palette.primary.main,
    transform: 'translateX(4px)',
  },
  ...(isActive && {
    backgroundColor: theme.palette.primary.light + '25',
    color: theme.palette.primary.main,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: theme.palette.primary.light + '30',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 4,
      backgroundColor: theme.palette.primary.main,
      borderRadius: '0 2px 2px 0',
    },
  }),
  ...(level === 0 && {
    fontWeight: 600,
    color: theme.palette.text.primary,
    fontSize: '0.95rem',
  }),
  ...(level === 1 && {
    color: theme.palette.text.primary + 'DD',
    fontSize: '0.9rem',
  }),
  ...(level >= 2 && {
    color: theme.palette.text.primary + 'BB',
    fontSize: '0.85rem',
  }),
}));

const NavItemComponent = ({ 
  item, 
  level = 0, 
  onItemSelect,
  activeItem,
  setActiveItem 
}: { 
  item: NavItem; 
  level?: number;
  onItemSelect?: (item: NavItem) => void;
  activeItem: string | null;
  setActiveItem: (id: string) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(level === 0)
  const hasChildren = item.children && item.children.length > 0
  const isActive = activeItem === item.id

  const handleToggle = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded)
    }
    onItemSelect?.(item)
  }

  const handleItemClick = () => {
    setActiveItem(item.id)
    onItemSelect?.(item)
  }

  const getIcon = () => {
    if (item.icon) return item.icon
    
    if (level === 0) return <Business fontSize="small" />
    if (level === 1) return <Folder fontSize="small" />
    if (level === 2) return <InsertDriveFile fontSize="small" />
    return <InsertDriveFile fontSize="small" />
  }

  return (
    <Box sx={{ width: '100%' }}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <StyledListItemButton
          onClick={hasChildren ? handleToggle : handleItemClick}
          level={level}
          isActive={isActive}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            {getIcon()}
          </ListItemIcon>
          <ListItemText 
            primary={item.label}
            primaryTypographyProps={{
              fontSize: 'inherit',
              fontWeight: 'inherit',
              noWrap: true,
            }}
          />
          {hasChildren && (
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight fontSize="small" />
            </motion.div>
          )}
        </StyledListItemButton>
      </motion.div>

      {hasChildren && (
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ overflow: 'hidden' }}
        >
          <Box sx={{ py: 0.5 }}>
            {item.children!.map((child) => (
              <NavItemComponent 
                key={child.id} 
                item={child} 
                level={level + 1}
                onItemSelect={onItemSelect}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            ))}
          </Box>
        </motion.div>
      )}
    </Box>
  )
}

export default function SideNavPanel({ data, className, onItemSelect }: SideNavPanelProps) {
  const { activeItem, setActive } = useNavState(data)

  return (
    <StyledPaper className={className}>
      <Box sx={{ 
        p: 3, 
        borderBottom: 1, 
        borderColor: 'divider',
        background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Avatar sx={{ 
            bgcolor: 'primary.main', 
            width: 40, 
            height: 40,
            boxShadow: 2
          }}>
            <Palette />
          </Avatar>
          <Box>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, color: 'primary.main' }}>
              FastUI
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
              Optym UI Components
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, opacity: 0.8 }}>
          AI-powered component library
        </Typography>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', py: 1 }}>
        <List sx={{ py: 0 }}>
          {data.map((item) => (
            <ListItem key={item.id} sx={{ px: 0, py: 0 }}>
              <NavItemComponent 
                item={item}
                onItemSelect={onItemSelect}
                activeItem={activeItem}
                setActiveItem={setActive}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider />
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Built with Material UI
        </Typography>
      </Box>
    </StyledPaper>
  )
}
