import React from "react"
import { useTheme } from "@mui/material/styles"

export interface PieChartSegment {
  value: number
  color: string
}

export interface PieChartProps {
  /** Slices of the pie */
  segments: PieChartSegment[]
  /** SVG viewbox size (px) */
  size?: number
  /** Optional label rendered in the centre */
  label?: React.ReactNode
  /** Optional secondary label */
  subLabel?: React.ReactNode
  /** Font size for label */
  labelFontSize?: number
  /** Font size for sub-label */
  subLabelFontSize?: number
  /** Degrees of gap between slices (dynamic variant) */
  gapDegrees?: number
}

const degToRad = (deg: number) => (deg * Math.PI) / 180

const describeArc = (
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string => {
  const start = {
    x: cx + r * Math.cos(degToRad(startAngle)),
    y: cy + r * Math.sin(degToRad(startAngle)),
  }
  const end = {
    x: cx + r * Math.cos(degToRad(endAngle)),
    y: cy + r * Math.sin(degToRad(endAngle)),
  }
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1
  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
    "Z",
  ].join(" ")
}

const PieChart: React.FC<PieChartProps> = ({
  segments,
  size = 180,
  label,
  subLabel,
  labelFontSize = 26,
  subLabelFontSize = 16,
  gapDegrees = 0,
}) => {
  const theme = useTheme()
  const total = React.useMemo(() => segments.reduce((acc, s) => acc + s.value, 0), [segments])
  const radius = size / 2

  const totalGap = gapDegrees * segments.length
  const adjustedTotalAngle = 360 - totalGap

  let cumulativeAngle = 0
  const paths = segments.map((seg, idx) => {
    const angle = (seg.value / total) * adjustedTotalAngle
    const startAngle = cumulativeAngle + gapDegrees / 2
    const endAngle = startAngle + angle
    cumulativeAngle += angle + gapDegrees

    const d = describeArc(radius, radius, radius, startAngle, endAngle)

    return <path key={idx} d={d} fill={seg.color} />
  })

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size}>{paths}</svg>
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

export default PieChart 