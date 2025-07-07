import React from "react"
import { useTheme } from "@mui/material/styles"

export interface DonutChartSegment {
  /** Numeric value represented by the segment */
  value: number
  /** Stroke color for the segment */
  color: string
}

export interface DonutChartProps {
  /** Array of segment definitions */
  segments: DonutChartSegment[]
  /** Diameter of the chart in px */
  size?: number
  /** Stroke thickness in px */
  thickness?: number
  /** Round line cap for segments */
  rounded?: boolean
  /** Main label displayed at the centre */
  label?: React.ReactNode
  /** Secondary label under the main label */
  subLabel?: React.ReactNode
  /** Font size (px) for main label */
  labelFontSize?: number
  /** Font size (px) for sub-label */
  subLabelFontSize?: number
}

const TWO_PI = Math.PI * 2

const DonutChart: React.FC<DonutChartProps> = ({
  segments,
  size = 200,
  thickness = 18,
  rounded = true,
  label,
  subLabel,
  labelFontSize = 26,
  subLabelFontSize = 16,
}) => {
  const theme = useTheme()

  const total = React.useMemo(() => segments.reduce((acc, s) => acc + s.value, 0), [segments])
  const radius = React.useMemo(() => (size - thickness) / 2, [size, thickness])
  const circumference = React.useMemo(() => TWO_PI * radius, [radius])

  let cumulative = 0
  const circles = segments.map((seg, idx) => {
    const fraction = seg.value / total
    const dashArray = fraction * circumference
    const gap = circumference - dashArray
    const strokeDasharray = `${dashArray} ${gap}`
    const strokeDashoffset = -cumulative * circumference
    cumulative += fraction

    return (
      <circle
        key={idx}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        fill="transparent"
        stroke={seg.color}
        strokeWidth={thickness}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap={rounded ? "round" : "butt"}
        style={{ transition: "stroke-dashoffset 0.3s ease" }}
      />
    )
  })

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {circles}
      </svg>
      {(label || subLabel) && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          {label && (
            <span
              style={{
                fontFamily: "Open Sans, Roboto, sans-serif",
                fontWeight: 700,
                fontSize: labelFontSize,
                lineHeight: `${labelFontSize + 8}px`,
                color: theme.custom?.designTokens?.text?.primary || "#3F4F6B",
              }}
            >
              {label}
            </span>
          )}
          {subLabel && (
            <span
              style={{
                fontFamily: "Open Sans, Roboto, sans-serif",
                fontWeight: 400,
                fontSize: subLabelFontSize,
                lineHeight: `${subLabelFontSize + 8}px`,
                color: theme.custom?.designTokens?.text?.secondary || "#67778A",
              }}
            >
              {subLabel}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default DonutChart 