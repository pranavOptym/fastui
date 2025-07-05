"use client"

import React, { forwardRef } from "react"
import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress, styled, SxProps, Theme } from "@mui/material"
import { RmaxButtonProps } from "../component-interface"

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'rmaxVariant',
})<{
  rmaxVariant?: 'primary' | 'outlined' | 'text';
  size?: MuiButtonProps['size'];
}>(({ theme, rmaxVariant, size }) => {
  const t = theme.custom?.designTokens
  if (!t) return {}
  let style: any = {
    borderRadius: theme.custom.borderRadius.sm,
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: 'none',
    transition: theme.custom.transitions.normal,
    fontFamily: 'Open Sans, Roboto, Helvetica, Arial, sans-serif',
    lineHeight: '18px',
    letterSpacing: '0.2px',
  }
  if (!size || size === 'medium') {
    style.fontSize = 14;
    style.padding = '8px 22px';
  }
  if (rmaxVariant === 'primary') {
    style.backgroundColor = t.primary.main
    style.color = t.primary.contrast
    style['&:hover'] = { backgroundColor: t.primary.dark }
    style['&:active'] = { backgroundColor: t.primary.outlinedBorder }
    style['&.Mui-disabled'] = {
      backgroundColor: t.action.disabledBackground,
      color: t.action.disabled,
    }
  } else if (rmaxVariant === 'outlined') {
    style.backgroundColor = 'transparent'
    style.color = t.primary.main
    style.border = `1px solid ${t.primary.outlinedBorder}`
    style['&:hover'] = { backgroundColor: t.primary.hover }
    style['&:active'] = { backgroundColor: t.primary.selected }
    style['&.Mui-disabled'] = {
      borderColor: t.action.disabledBackground,
      color: t.action.disabled,
    }
  } else if (rmaxVariant === 'text') {
    style.backgroundColor = 'transparent'
    style.color = t.primary.main
    style['&:hover'] = { backgroundColor: t.primary.hover }
    style['&:active'] = { backgroundColor: t.primary.selected }
    style['&.Mui-disabled'] = {
      color: t.action.disabled,
    }
  }
  return style
})

const RmaxButton = forwardRef<HTMLButtonElement, RmaxButtonProps>(({
  variant = "primary",
  loading = false,
  leftIcon,
  rightIcon,
  children,
  ...rest
}, ref) => {
  const isDisabled = rest.disabled || loading
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return
    if (rest.onClick) rest.onClick(e)
  }
  const content = (
    <>
      {loading && (
        <CircularProgress size={rest.size === 'small' ? 16 : 20} color="inherit" sx={{ mr: 1 }} />
      )}
      {!loading && leftIcon && <span style={{ marginRight: 8 }}>{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span style={{ marginLeft: 8 }}>{rightIcon}</span>}
    </>
  )
  let muiVariant: MuiButtonProps['variant'] = variant === 'primary' ? 'contained' : variant
  return (
    <StyledButton
      {...rest}
      variant={muiVariant}
      rmaxVariant={variant}
      disabled={isDisabled}
      onClick={handleClick}
      ref={ref}
    >
      {content}
    </StyledButton>
  )
})

RmaxButton.displayName = "RmaxButton"

export default RmaxButton
