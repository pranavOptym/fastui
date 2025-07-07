import React from "react"
import { useTheme } from "@mui/material/styles"

export interface GaugeRing {
  /** Progress ratio 0..1 */
  progress: number
  /** Stroke color */
  color: string
}

export interface MultiRingGaugeProps {
  /** Gauge diameter (px) */
  size?: number
  /** Thickness of each ring */
  thickness?: number
  /** Spacing between rings */
  ringSpacing?: number
  /** Gap angle in degrees between start and end */
  gapAngle?: number
  /** Rings data outer→inner order */
  rings: GaugeRing[]
  /** Center label */
  label?: React.ReactNode
  /** Sub-label */
  subLabel?: React.ReactNode
  /** Track color */
  trackColor?: string
  /** Font sizes */
  labelFontSize?: number
  subLabelFontSize?: number
}

const degToRad = (deg: number) => (deg * Math.PI) / 180

const polar = (cx: number, cy: number, r: number, angle: number) => {
  const rad = degToRad(angle)
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

const describeArc = (
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) => {
  const start = polar(cx, cy, r, endAngle)
  const end = polar(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`
}

const MultiRingGauge: React.FC<MultiRingGaugeProps> = ({
  size = 320,
  thickness = 20,
  ringSpacing = 12,
  gapAngle = 20,
  rings,
  label,
  subLabel,
  trackColor = "#FFFFFF",
  labelFontSize = 40,
  subLabelFontSize = 24,
}) => {
  const theme = useTheme()
  const cx = size / 2
  const cy = size / 2

  const startAngle = -90 + gapAngle / 2
  const endAngle = 270 - gapAngle / 2
  const totalRange = endAngle - startAngle // 360 - gapAngle

  const paths: React.ReactNode[] = []

  rings.forEach((ring, idx) => {
    const radius = cx - thickness / 2 - idx * (thickness + ringSpacing)
    if (radius <= thickness / 2) return

    // track path
    const trackPath = describeArc(cx, cy, radius, startAngle, endAngle)
    paths.push(
      <path
        key={`track-${idx}`}
        d={trackPath}
        stroke={trackColor}
        strokeWidth={thickness}
        fill="none"
        strokeLinecap="round"
      />,
    )

    // progress path
    const progressEnd = startAngle + totalRange * Math.min(Math.max(ring.progress, 0), 1)
    const progressPath = describeArc(cx, cy, radius, startAngle, progressEnd)
    paths.push(
      <path
        key={`progress-${idx}`}
        d={progressPath}
        stroke={ring.color}
        strokeWidth={thickness}
        fill="none"
        strokeLinecap="round"
      />,
    )
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

export default MultiRingGauge 