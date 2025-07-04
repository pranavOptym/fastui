"use client"

import React from "react"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Button, ButtonProps } from "./Button"

interface RmaxButtonProps extends ButtonProps {
  children: React.ReactNode
}

export const RmaxButton: React.FC<RmaxButtonProps> = ({ children, ...buttonProps }) => {
  return (
    <ThemeProvider initialTheme="rmax">
      <Button {...buttonProps}>
        {children}
      </Button>
    </ThemeProvider>
  )
}

export default RmaxButton 