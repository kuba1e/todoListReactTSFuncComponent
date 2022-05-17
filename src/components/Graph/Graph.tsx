import React, { useEffect, useRef } from 'react'

import './Graph.scss'

export const Graph = () => {
  const canvasElement = useRef(null)
  useEffect(() => {
    if (canvasElement.current !== null) {
      const canvas = canvasElement.current as HTMLCanvasElement
      const ctx = canvas.getContext('2d')

      const canvasPlotWidth = canvas.clientWidth
      const canvasPlotHeight = canvas.clientHeight

      const scaleX = 10
      const scaleY = 10

      for (let i = 0; i <= canvasPlotWidth; i += scaleX) {
        ctx?.moveTo(i, 0)
        ctx?.lineTo(i, canvasPlotHeight)
      }

      for (let i = 0; i <= canvasPlotHeight; i += scaleY) {
        ctx?.moveTo(0, i)
        ctx?.lineTo(canvasPlotWidth, i)
      }
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 1
      ctx?.stroke()
      ctx?.closePath()

      ctx?.beginPath()
      ctx?.moveTo(0, 0)
      ctx?.lineTo(canvasPlotWidth, 0)
      ctx?.moveTo(0, 0)
      ctx?.lineTo(0, canvasPlotHeight)
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 2
      ctx?.stroke()
      ctx?.closePath()
    }
  }, [])
  return (
    <div>
      <canvas ref={canvasElement} className='graph'></canvas>
    </div>
  )
}
