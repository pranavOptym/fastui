"use client"

import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { RmaxTabBarActionsProps } from "../component-interface";


const RmaxTabBarActions: React.FC<RmaxTabBarActionsProps> = ({
  actions,
  sx,
  iconSize = 'small',
  gap,
}) => {
  const iconGap = gap !== undefined ? gap : 1;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: iconGap, ...sx }}>
      {actions.map((action, idx) => (
        <Tooltip title={action.tooltip || ''} key={action.key || idx}>
          <IconButton 
            onClick={action.onClick} 
            size={iconSize} 
            sx={{ 
              color: action.color, 
              '&:hover': action.hoverColor ? { color: action.hoverColor } : undefined 
            }}
          >
            {action.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};

export default RmaxTabBarActions; 