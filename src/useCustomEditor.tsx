import {useState, useEffect} from 'react'
import {fabric} from 'fabric'

export const STROKE = '#000000'

export const TEXT = {
  type: 'text',
  fontSize: 16,
  fontFamily: 'Arial',
  fill: STROKE,
  top: 150
}

export interface FabricJSEditor {
  canvas: fabric.Canvas
  mask: any
  addText: (text: string) => void
  updateText: (text: string) => void
  deleteAll: () => void
  deleteSelected: () => void
  addImg: (url: string) => void
}

interface FabricJSEditorState {
  editor?: FabricJSEditor
}

interface FabricJSEditorHook extends FabricJSEditorState {
  selectedObjects?: fabric.Object[]
  onReady: (canvas: fabric.Canvas, mask: any) => void
}

interface FabricJSEditorHookProps {
  defaultFillColor?: string
  defaultStrokeColor?: string
}

const buildEditor = (
  canvas: fabric.Canvas,
  mask: any,
  strokeColor?: string,
  _setStrokeColor?: (color: string) => void
): FabricJSEditor => {
  return {
    canvas,
    mask,
    addImg: (url: string) => {
      fabric.Image.fromURL(url, function (img) {
        img.clipPath = mask
        img.scaleToWidth(100)
        canvas.add(img)
        canvas.centerObject(img)
      })
    },
    addText: (text: string) => {
      // use stroke in text fill, fill default is most of the time transparent
      const object = new fabric.Textbox(text, {...TEXT, fill: strokeColor})
      object.set({text: text})
      object.clipPath = mask
      canvas.add(object)
      canvas.centerObjectH(object)
    },
    updateText: (text: string) => {
      const objects: any[] = canvas.getActiveObjects()
      if (objects.length && objects[0].type === TEXT.type) {
        const textObject: fabric.Textbox = objects[0]
        textObject.set({text})
        canvas.renderAll()
      }
    },
    deleteAll: () => {
      canvas.getObjects().forEach((object) => canvas.remove(object))
      canvas.discardActiveObject()
      canvas.renderAll()
    },
    deleteSelected: () => {
      canvas.getActiveObjects().forEach((object) => canvas.remove(object))
      canvas.discardActiveObject()
      canvas.renderAll()
    }
  }
}

export const useCustomEditor = (
  props: FabricJSEditorHookProps = {}
): FabricJSEditorHook => {
  const {defaultStrokeColor} = props
  const [canvas, setCanvas] = useState<null | fabric.Canvas>(null)
  const [mask, setMask] = useState<any>(null)
  const [selectedObjects, setSelectedObject] = useState<fabric.Object[]>([])
  const [strokeColor, setStrokeColor] = useState<string>(
    defaultStrokeColor || STROKE
  )
  useEffect(() => {
    const bindEvents = (canvas: fabric.Canvas) => {
      canvas.on('selection:cleared', () => {
        setSelectedObject([])
      })
      canvas.on('selection:created', (e: any) => {
        setSelectedObject(e.selected)
      })
      canvas.on('selection:updated', (e: any) => {
        setSelectedObject(e.selected)
      })
    }
    if (canvas) {
      bindEvents(canvas)
    }
  }, [canvas])

  return {
    selectedObjects,
    onReady: (canvasReady: fabric.Canvas, mask: any): void => {
      console.log('Fabric canvas ready')
      setCanvas(canvasReady)
      setMask(mask)
    },
    editor: canvas
      ? buildEditor(canvas, mask, strokeColor, setStrokeColor)
      : undefined
  }
}
