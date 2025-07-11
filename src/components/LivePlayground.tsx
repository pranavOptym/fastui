"use client";

import React, { useState, useRef, useEffect } from "react";
import { Alert, Avatar, Box, Typography } from "@mui/material";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import RmaxButton  from "../design-system/Routemax/RmaxButton";
import * as Icons from "@mui/icons-material";
import RmaxTabBar from "../design-system/Routemax/RmaxTabBar";
import RmaxTabBarActions from "../design-system/Routemax/RmaxTabBarActions";
import VerticalDividerGroup from "../design-system/VerticalDividerGroup";
import { themes } from "@/lib/theme";
import RmaxGrid from "../design-system/Routemax/RmaxGrid";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../design-system/Routemax/RmaxGrid.css";
import { ThemeProvider } from "./ThemeProvider";
import DonutChart from "../design-system/DonutChart"
import MultiRingGauge from "../design-system/MultiRingGauge"
import PieChart from "../design-system/PieChart"
import SliderChart from "../design-system/SliderChart"
import GaugeChartOrbit from "../design-system/GaugeChartOrbit"

// Types for EditorWithAutoScroll props
interface EditorWithAutoScrollProps {
  code: string;
  onChange: (newCode: string) => void;
}

// Types for LivePlayground props
interface LivePlaygroundProps {
  code?: string;
  onChange?: (newCode: string) => void;
}

const scope = { RmaxButton, ...Icons, Alert, RmaxTabBar, VerticalDividerGroup, theme: themes.light, RmaxGrid, ThemeProvider, DonutChart, MultiRingGauge, PieChart, SliderChart, GaugeChartOrbit };


const EditorWithAutoScroll = ({ code, onChange }: EditorWithAutoScrollProps) => {
  const editorContainerRef = useRef<HTMLDivElement>(null);

  const handleChange = (newCode: string) => {
    const container = editorContainerRef.current;
    const threshold = 20; // px
    const nearBottom = container
      ? container.scrollHeight - container.clientHeight - threshold <= container.scrollTop
      : false;

    onChange(newCode);

    if (nearBottom) {
      setTimeout(() => {
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, 0);
    }
  };

  return (
    <div
      ref={editorContainerRef}
      style={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        borderRadius: 8,
        background: "#f8f9fa",
        border: "1px solid #e0e0e0",
        backgroundColor: 'rgb(1, 22, 39)'
      }}
    >
      <LiveEditor
        style={{
          width: "100%",
          minHeight: "100%",
          fontFamily: "monospace",
          fontSize: 15,
          background: "transparent",
          outline: "none",
          border: "none",
          padding: "16px",
          boxSizing: "border-box",
        }}
        code={code}
        onChange={handleChange}
      />
    </div>
  );
};

const LivePlayground = ({ code,  onChange }: LivePlaygroundProps) => {
  const [internalCode, setInternalCode] = useState<string>(code || "");
  
  const handleCodeChange = (newCode: string) => {
    setInternalCode(newCode);
    if (onChange) {
      onChange(newCode);
    }
  };

  useEffect(() => {
    setInternalCode(code || "");
  }, [code]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "linear-gradient(135deg, #f8fafc 0%, #e3f0ff 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: { xs: 2, md: 4 },
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          height: "100%",
          borderRadius: 4,
          boxShadow: 8,
          overflow: "hidden",
          bgcolor: "white",
          display: "flex",
          flexDirection: "column",
          p: { xs: 2, md: 4 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 3,
            textAlign: "center",
            letterSpacing: 1,
          }}
        >
          FastUI Live Playground
        </Typography>
          <LiveProvider code={internalCode || ""} scope={scope} noInline={false}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                flex: 1,
                minHeight: 0,
                width: "100%",
                gap: 3,
              }}
            >
              {/* Code Editor */}
              <Box 
                sx={{ 
                  flex: 1, 
                  minWidth: 0, 
                  display: "flex", 
                  flexDirection: "column",
                  height: "100%",
                  minHeight: 0,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Code Editor
                </Typography>
                <Box sx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
                  <EditorWithAutoScroll code={internalCode} onChange={handleCodeChange} />
                  <LiveError
                    style={{
                      color: "#c62828",
                      background: "#ffebee",
                      padding: "8px",
                      borderRadius: 4,
                      fontSize: 13,
                      marginTop: 8,
                      flexShrink: 0,
                    }}
                  />
                </Box>
              </Box>

              {/* Live Preview */}
              <Box
                sx={{
                  flex: 1,
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  minHeight: 0,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Live Preview
                </Typography>
                <Box
                  sx={{
                    flex: 1,
                    bgcolor: "#f5f7fa",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 2,
                    p: 3,
                    overflow: "auto",
                    boxShadow: "inset 0 1px 4px #e0e7ef",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <LivePreview />
                </Box>
              </Box>
            </Box>
          </LiveProvider>
      </Box>
    </Box>
  );
};

export default LivePlayground; 