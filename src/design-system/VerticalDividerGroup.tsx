import React from "react";
import { Box } from "@mui/material";

interface VerticalDividerGroupProps {
  children: React.ReactNode;
  dividerHeight?: number | string;
  dividerColor?: string;
  dividerMargin?: number | string;
}

const VerticalDividerGroup: React.FC<VerticalDividerGroupProps> = ({
  children,
  dividerHeight = 1000,
  dividerColor = "#5c5c5c99", // light gray with some opacity
  dividerMargin = 16,
}) => {
  const items = React.Children.toArray(children);
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {items.map((child, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && (
            <Box
              component="span"
              sx={{
                width: 1.5,
                height: dividerHeight,
                backgroundColor: dividerColor,
                mx: 1,
                borderRadius: 1,
                display: 'inline-block',
              }}
            />
          )}
          {child}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default VerticalDividerGroup; 