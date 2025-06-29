"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronRight, Folder, File, Building } from "lucide-react"
import { cn } from "@/lib/utils"
import { useNavState, type NavItem } from "@/hooks/useNavState"

interface SideNavPanelProps {
  data: NavItem[]
  className?: string
  onItemSelect?: (item: NavItem) => void
}

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
  }

  const handleItemClick = () => {
    setActiveItem(item.id)
    onItemSelect?.(item)
  }

  const getIcon = () => {
    if (item.icon) return item.icon
    
    if (level === 0) return <Building className="w-4 h-4" />
    if (level === 1) return <Folder className="w-4 h-4" />
    if (level === 2) return <File className="w-4 h-4" />
    return <File className="w-4 h-4" />
  }

  return (
    <div className="w-full">
      <motion.button
        onClick={hasChildren ? handleToggle : handleItemClick}
        className={cn(
          "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          isActive && "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
          level === 0 && "font-semibold text-gray-900 dark:text-gray-100",
          level === 1 && "text-gray-700 dark:text-gray-300",
          level >= 2 && "text-gray-600 dark:text-gray-400"
        )}
        style={{ paddingLeft: `${12 + level * 16}px` }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {getIcon()}
        <span className="flex-1 text-left truncate">{item.label}</span>
        {hasChildren && (
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        )}
      </motion.button>

      {hasChildren && (
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="space-y-1">
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
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default function SideNavPanel({ data, className, onItemSelect }: SideNavPanelProps) {
  const { activeItem, setActive } = useNavState(data)

  return (
    <div className={cn(
      "w-64 h-full bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800",
      "flex flex-col overflow-hidden",
      className
    )}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          FastUI
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Optym UI Components
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {data.map((item) => (
            <NavItemComponent 
              key={item.id} 
              item={item}
              onItemSelect={onItemSelect}
              activeItem={activeItem}
              setActiveItem={setActive}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
