"use client"

// Usage: 
// Standard MUI variants: <Button variant="contained" color="primary" />
// Custom theme variants: <Button className="soft" />, <Button className="gradient" />, <Button className="glow" />
// Design tokens are automatically applied based on the current theme

import React, { forwardRef } from "react"
import { motion } from "framer-motion"
import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress, styled, SxProps, Theme } from "@mui/material"

export interface ButtonProps {
  variant?: MuiButtonProps['variant']
  size?: MuiButtonProps['size']
  color?: MuiButtonProps['color']
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children?: React.ReactNode
  animateOnHover?: boolean
  animateOnClick?: boolean
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: "button" | "submit" | "reset"
  href?: string
  sx?: SxProps<Theme>
}

// Styled button that uses theme design tokens
const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => !['animateOnHover', 'animateOnClick'].includes(prop as string),
})<ButtonProps>(({ theme, className }) => {
  const tokens = theme.custom;
  
  // Apply custom variants based on className
  const customStyles: any = {};
  
  if (className?.includes('soft') && tokens.soft) {
    customStyles.backgroundColor = tokens.soft.primary;
    customStyles.color = theme.palette.primary.main;
    customStyles.border = `1px solid ${tokens.soft.primaryBorder}`;
    customStyles['&:hover'] = {
      backgroundColor: tokens.soft.primaryHover,
    };
  }
  
  if (className?.includes('gradient') && tokens.gradients) {
    customStyles.background = tokens.gradients.primary;
    customStyles.color = '#ffffff';
    customStyles.border = 'none';
    customStyles['&:hover'] = {
      background: tokens.gradients.primaryHover,
    };
  }
  
  if (className?.includes('glow') && tokens.glow) {
    customStyles.boxShadow = tokens.glow.primary;
  }
  
  return {
    ...customStyles,
  };
});

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = "contained",
  size = "medium",
  color = "primary",
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  animateOnHover = true,
  animateOnClick = true,
  className,
  onClick,
  type = "button",
  href,
  sx,
}, ref) => {
  const isDisabled = disabled || loading

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return
    if (onClick) onClick(e)
  }

  const buttonContent = (
    <>
      {loading && (
        <CircularProgress 
          size={size === 'small' ? 16 : 20} 
          color="inherit" 
          sx={{ mr: 1 }}
        />
      )}
      {!loading && leftIcon && <span style={{ marginRight: 8 }}>{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span style={{ marginLeft: 8 }}>{rightIcon}</span>}
    </>
  )

  const buttonProps: MuiButtonProps = {
    variant,
    color,
    size,
    disabled: isDisabled,
    fullWidth,
    onClick: handleClick,
    className,
    ref,
    type,
    ...(href ? { href } : {}),
    sx,
  }

  if (animateOnHover || animateOnClick) {
    return (
      <motion.div
        whileHover={animateOnHover ? { scale: 1.02 } : {}}
        whileTap={animateOnClick ? { scale: 0.98 } : {}}
        style={{ display: fullWidth ? 'block' : 'inline-block' }}
      >
        <StyledButton {...buttonProps}>
          {buttonContent}
        </StyledButton>
      </motion.div>
    )
  }

  return (
    <StyledButton {...buttonProps}>
      {buttonContent}
    </StyledButton>
  )
})

Button.displayName = "Button"

export { Button } 