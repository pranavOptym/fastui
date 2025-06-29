import { useState, useCallback } from "react"

export interface NavItem {
  id: string
  label: string
  icon?: React.ReactNode
  children?: NavItem[]
  isActive?: boolean
}

export function useNavState(initialData: NavItem[]) {
  const [navData, setNavData] = useState<NavItem[]>(initialData)
  const [activeItem, setActiveItem] = useState<string | null>(null)

  const updateNavData = useCallback((newData: NavItem[]) => {
    setNavData(newData)
  }, [])

  const addNavItem = useCallback((parentId: string | null, newItem: NavItem) => {
    const addToParent = (items: NavItem[]): NavItem[] => {
      return items.map(item => {
        if (item.id === parentId) {
          return {
            ...item,
            children: [...(item.children || []), newItem]
          }
        }
        if (item.children) {
          return {
            ...item,
            children: addToParent(item.children)
          }
        }
        return item
      })
    }

    if (parentId === null) {
      setNavData(prev => [...prev, newItem])
    } else {
      setNavData(prev => addToParent(prev))
    }
  }, [])

  const removeNavItem = useCallback((itemId: string) => {
    const removeFromItems = (items: NavItem[]): NavItem[] => {
      return items.filter(item => {
        if (item.id === itemId) {
          return false
        }
        if (item.children) {
          item.children = removeFromItems(item.children)
        }
        return true
      })
    }

    setNavData(prev => removeFromItems(prev))
  }, [])

  const setActive = useCallback((itemId: string) => {
    setActiveItem(itemId)
  }, [])

  const findItem = useCallback((itemId: string): NavItem | null => {
    const findInItems = (items: NavItem[]): NavItem | null => {
      for (const item of items) {
        if (item.id === itemId) {
          return item
        }
        if (item.children) {
          const found = findInItems(item.children)
          if (found) return found
        }
      }
      return null
    }

    return findInItems(navData)
  }, [navData])

  const getItemPath = useCallback((itemId: string): string[] => {
    const findPath = (items: NavItem[], targetId: string, currentPath: string[] = []): string[] | null => {
      for (const item of items) {
        const newPath = [...currentPath, item.label]
        if (item.id === targetId) {
          return newPath
        }
        if (item.children) {
          const found = findPath(item.children, targetId, newPath)
          if (found) return found
        }
      }
      return null
    }

    return findPath(navData, itemId) || []
  }, [navData])

  return {
    navData,
    activeItem,
    updateNavData,
    addNavItem,
    removeNavItem,
    setActive,
    findItem,
    getItemPath
  }
} 