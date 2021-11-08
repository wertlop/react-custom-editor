import React, {useEffect, useRef} from 'react'
import {fabric} from 'fabric'

import styles from './index.css'

export interface Props {
  className?: string
  onReady?: (canvas: fabric.Canvas, clipPath: any) => void
  background: string
}

const FabricJSCanvas = ({
  className = 'fabricjs_canvas',
  onReady,
  background
}: Props) => {
  const canvasEl = useRef(null)
  const canvasElParent = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current)
    const setCurrentDimensions = () => {
      canvas.setHeight(canvasElParent.current?.clientHeight || 0)
      canvas.setWidth(canvasElParent.current?.clientWidth || 0)
      canvas.renderAll()
    }
    const resizeCanvas = () => {
      setCurrentDimensions()
    }
    setCurrentDimensions()

    window.addEventListener('resize', resizeCanvas, false)
    const mask = new fabric.Rect({
      width: 150,
      height: 150,
      top: 80,
      left: (canvas.width || 0) / 2 - 75,
      stroke: '#000000',
      fill: 'transparent',
      selectable: false
    })
    const clipPath = new fabric.Rect({
      width: 150,
      height: 150,
      top: 80,
      left: (canvas.width || 0) / 2 - 75,
      absolutePositioned: true
    })

    if (onReady) {
      onReady(canvas, clipPath)
    }

    fabric.Image.fromURL(background, function (img) {
      img.scaleToWidth(canvas.width || 100)
      img.scaleToHeight(canvas.height || 100)
      img.selectable = false
      canvas.add(img)
      canvas.centerObject(img)
      canvas.add(mask)
    })

    return () => {
      canvas.dispose()
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])
  return (
    <div
      ref={canvasElParent}
      className={styles[className]}
      style={{width: '100%', height: '100%'}}
    >
      <canvas ref={canvasEl} />
    </div>
  )
}

export default FabricJSCanvas
