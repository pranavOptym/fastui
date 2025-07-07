import React from "react"
import { useTheme } from "@mui/material/styles"

export interface GaugeSegment {
  /** Value for the segment (percentage of total gauge range) */
  value: number
  /** Stroke color */
  color: string
}

export interface GaugeChartOrbitProps {
  /** Size of the outer diameter in px */
  size?: number
  /** Thickness of the gauge arc */
  thickness?: number
  /** Array of segments (if provided, multi-segment mode). Optional if using pointer mode. */
  segments?: GaugeSegment[]
  /** Gap between segments in degrees */
  gapDegrees?: number
  /** Start angle (deg) for the gauge (default -140) */
  startAngle?: number
  /** End angle (deg) for the gauge (default 140) */
  endAngle?: number
  /** Background track color */
  trackColor?: string
  /** Label inside gauge */
  label?: React.ReactNode
  /** Sub label */
  subLabel?: React.ReactNode
  /** Label font sizes */
  labelFontSize?: number
  subLabelFontSize?: number
  /** Direct progress value (0..max) for single-color pointer style */
  value?: number
  /** Minimum value for pointer gauge */
  min?: number
  /** Maximum value for pointer gauge */
  max?: number
  /** Pointer color (defaults to first segment color or theme primary) */
  pointerColor?: string
  /** Show major tick labels around arc (pointer mode) */
  ticks?: number[]
  /** Minor tick count between min and max (pointer mode) */
  minorTickCount?: number
  /** Tick label formatter */
  tickFormatter?: (v: number) => string
}

const degToRad = (deg: number) => (deg * Math.PI) / 180

const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
  const rad = degToRad(angle)
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  }
}

const describeArcStroke = (
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) => {
  const start = polarToCartesian(cx, cy, r, endAngle) // reversed because SVG draws from start to end clockwise
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`
}

const GaugeChartOrbit: React.FC<GaugeChartOrbitProps> = ({
  size = 192,
  thickness = 18,
  segments,
  gapDegrees = 2,
  startAngle = -140,
  endAngle = 140,
  trackColor = "#E4E7EB",
  label,
  subLabel,
  labelFontSize = 26,
  subLabelFontSize = 16,
  value,
  min = 0,
  max = 100,
  pointerColor,
  ticks = [0, 30, 60, 90, 120],
  minorTickCount = 40,
  tickFormatter = (v) => `${v}`,
}) => {
  const theme = useTheme()
  const cx = size / 2
  const cy = size / 2
  const radius = cx - thickness / 2
  const totalRange = endAngle - startAngle
  let paths: React.ReactNode[] = []
  const trackPath = describeArcStroke(cx, cy, radius, startAngle, endAngle)
  paths.push(
    <path key="track" d={trackPath} stroke={trackColor} strokeWidth={thickness} fill="none" strokeLinecap="round" />,
  )

  if (segments && segments.length) {
    const totalGap = gapDegrees * segments.length
    const adjustedRange = totalRange - totalGap
    const totalSegVal = segments.reduce((acc, s) => acc + s.value, 0)
    let cumulativeAngle = startAngle
    segments.forEach((seg, idx) => {
      const segAngle = (seg.value / totalSegVal) * adjustedRange
      const segStart = cumulativeAngle + gapDegrees / 2
      const segEnd = segStart + segAngle
      cumulativeAngle += segAngle + gapDegrees
      const d = describeArcStroke(cx, cy, radius, segStart, segEnd)
      paths.push(
        <path key={`seg-${idx}`} d={d} stroke={seg.color} strokeWidth={thickness} fill="none" strokeLinecap="round" />,
      )
    })
  } else if (value !== undefined) {
    const ratio = Math.min(Math.max((value - min) / (max - min), 0), 1)
    const progressEnd = startAngle + totalRange * ratio
    const progressPath = describeArcStroke(cx, cy, radius, startAngle, progressEnd)
    const progressCol = pointerColor || segments?.[0]?.color || theme.palette.primary.main
    paths.push(
      <path key="progress" d={progressPath} stroke={progressCol} strokeWidth={thickness} fill="none" strokeLinecap="round" />,
    )

    // pointer
    const pointerLen = radius - thickness - 4
    const pointerRad = degToRad(progressEnd)
    const px = cx + pointerLen * Math.cos(pointerRad)
    const py = cy + pointerLen * Math.sin(pointerRad)

    // major tick labels
    ticks.forEach((tv, i) => {
      const ratio = (tv - min) / (max - min)
      const angle = startAngle + totalRange * ratio
      const pos = polarToCartesian(cx, cy, radius + thickness / 2 + 28, angle)
      paths.push(
        <text
          key={`tick-label-${i}`}
          x={pos.x}
          y={pos.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="Open Sans, Roboto, sans-serif"
          fontSize={16}
          fontWeight={600}
          fill={theme.custom?.designTokens?.text?.primary || "#3F4F6B"}
        >
          {tickFormatter(tv)}
        </text>,
      )
    })

    // minor tick marks
    for (let i = 0; i <= minorTickCount; i++) {
      const ratio = i / minorTickCount
      const angle = startAngle + totalRange * ratio
      const inner = polarToCartesian(cx, cy, radius + thickness / 2 + 6, angle)
      const outer = polarToCartesian(cx, cy, radius + thickness / 2 + 12, angle)
      paths.push(
        <line
          key={`minor-${i}`}
          x1={inner.x}
          y1={inner.y}
          x2={outer.x}
          y2={outer.y}
          stroke={theme.custom?.designTokens?.text?.secondary || "#67778A"}
          strokeWidth={1}
        />,
      )
    }

    // knob
    paths.push(
      <circle key="knob" cx={px} cy={py} r={12} fill="#fff" stroke="#E0E0E0" strokeWidth={2} />,
    )
  }

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

export default GaugeChartOrbit 