'use client'

import { useState, useRef, useEffect } from 'react'

interface DataPoint {
  label: string
  value: number
}

interface CustomLineChartProps {
  data: DataPoint[]
  height?: number
  onHoverChange?: (point: DataPoint | null) => void
}

export default function CustomLineChart({
  data,
  height = 320,
  onHoverChange,
}: CustomLineChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const maxValue = Math.max(...data.map((d) => d.value))
  const padding = 32
  const [width, setWidth] = useState(1000)

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const getX = (i: number) =>
    padding + i * ((width - padding * 2) / (data.length - 1))

  const getY = (val: number) =>
    height - padding - (val / maxValue) * (height - padding * 2)

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const bounds = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - bounds.left - padding
    const stepX = (bounds.width - padding * 2) / (data.length - 1)
    const index = Math.round(x / stepX)

    if (index >= 0 && index < data.length) {
      setHoverIndex(index)
      onHoverChange?.(data[index])
    } else {
      setHoverIndex(null)
      onHoverChange?.(null)
    }
  }

  const handleMouseLeave = () => {
    setHoverIndex(null)
    onHoverChange?.(null)
  }

  return (
    <div ref={containerRef} className="relative w-full" style={{ height }}>
      <svg
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="text-sisugreen/90 block"
      >
        {/* Bottom grid line */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#E4E4E7"
          strokeDasharray="4"
        />

        {/* Straight line path */}
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          points={data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(' ')}
        />

        {/* Hover line & dot */}
        {hoverIndex !== null && (
          <>
            <line
              x1={getX(hoverIndex)}
              y1={padding / 2}
              x2={getX(hoverIndex)}
              y2={height - padding}
              stroke="#94A3B8"
              strokeDasharray="4"
              strokeWidth="1"
            />
            <circle
              cx={getX(hoverIndex)}
              cy={getY(data[hoverIndex].value)}
              r={6}
              fill="white"
              stroke="#1F3D2B"
              strokeWidth={2}
            />
          </>
        )}
      </svg>
    </div>
  )
}
