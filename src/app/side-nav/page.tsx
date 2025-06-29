"use client"

import { useState } from "react"
import SideNavPanel from "@/components/SideNavPanel"
import { type NavItem } from "@/hooks/useNavState"

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

export default function SideNavDemo() {
  const [selectedItem, setSelectedItem] = useState<NavItem | null>(null)

  const handleItemSelect = (item: NavItem) => {
    setSelectedItem(item)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SideNavPanel data={navData} onItemSelect={handleItemSelect}/>
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            FastUI Side Navigation Demo
          </h1>
        </div>
      </div>
    </div>
  )
} 