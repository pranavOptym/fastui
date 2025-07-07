import React, { useCallback, useEffect, useRef, useState } from "react"
import GaugeChartOrbit, { GaugeChartOrbitProps } from "./GaugeChartOrbit"

export interface SliderChartProps extends Omit<GaugeChartOrbitProps, "value" | "segments" | "subLabel"> {
  value?: number
  onChange?: (v: number) => void
  formatSubLabel?: (v: number) => React.ReactNode
}

const SliderChart: React.FC<SliderChartProps> = ({
  value: controlledValue,
  onChange,
  min = 0,
  max = 100,
  formatSubLabel = (v) => Math.round(v),
  ...rest
}) => {
  const [internalVal, setInternalVal] = useState(controlledValue ?? min)
  const value = controlledValue !== undefined ? controlledValue : internalVal

  const containerRef = useRef<HTMLDivElement>(null)
  const startAngle = rest.startAngle ?? -140
  const endAngle = rest.endAngle ?? 140

  const updateFromEvent = useCallback((e: MouseEvent | TouchEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const clientX = "clientX" in e ? e.clientX : e.touches[0].clientX
    const clientY = "clientY" in e ? e.clientY : e.touches[0].clientY
    const dx = clientX - cx
    const dy = clientY - cy
    const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI
    let norm = angleDeg < 0 ? angleDeg + 360 : angleDeg
    let sNorm = ((startAngle % 360) + 360) % 360
    let eNorm = ((endAngle % 360) + 360) % 360
    if (eNorm <= sNorm) eNorm += 360
    if (norm < sNorm) norm += 360
    const clamped = Math.min(Math.max(norm, sNorm), eNorm)
    const ratio = (clamped - sNorm) / (eNorm - sNorm)
    const newVal = min + ratio * (max - min)
    if (controlledValue === undefined) setInternalVal(newVal)
    onChange?.(newVal)
  }, [containerRef, startAngle, endAngle, min, max, controlledValue, onChange])

  const handleDown = (e: React.PointerEvent) => {
    e.preventDefault()
    window.addEventListener("pointermove", updateFromEvent)
    window.addEventListener("pointerup", handleUp)
  }

  const handleUp = () => {
    window.removeEventListener("pointermove", updateFromEvent)
    window.removeEventListener("pointerup", handleUp)
  }

  useEffect(() => () => handleUp(), [])

  return (
    <div ref={containerRef} onPointerDown={handleDown} style={{ display: "inline-block" }}>
      <GaugeChartOrbit value={value} min={min} max={max} subLabel={formatSubLabel(value)} {...rest} />
    </div>
  )
}

export default SliderChart 