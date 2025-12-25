'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import * as fabric from 'fabric'

interface Annotation {
  id: string;
  type: string;
  coordinates: Record<string, number>;
  label?: string | null;
  frameTime?: number | null;
}

interface Props {
  mediaUrl: string;
  mediaType: 'IMAGE' | 'VIDEO';
  currentTool: 'select' | 'rect' | 'ellipse';
  annotations: Annotation[];
  onAnnotationsChange: (annotations: Annotation[]) => void;
  readOnly?: boolean;
}

export default function AnnotationCanvas({
  mediaUrl,
  mediaType,
  currentTool,
  annotations,
  onAnnotationsChange,
  readOnly = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const fabricRef = useRef<fabric.Canvas | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [zoom, setZoom] = useState(1)
  const [videoTime, setVideoTime] = useState(0)
  const [isDrawing, setIsDrawing] = useState(false)
  const startPointRef = useRef<{ x: number; y: number } | null>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [videoDuration, setVideoDuration] = useState(100)

  // 初始化 Fabric Canvas
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const container = containerRef.current
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: container.clientWidth,
      height: container.clientHeight,
      selection: !readOnly,
    })

    fabricRef.current = canvas

    // 处理窗口大小变化
    const handleResize = () => {
      canvas.setDimensions({
        width: container.clientWidth,
        height: container.clientHeight,
      })
      canvas.renderAll()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.dispose()
    }
  }, [readOnly])

  // 加载媒体
  useEffect(() => {
    if (!fabricRef.current || !mediaUrl) return

    const canvas = fabricRef.current

    if (mediaType === 'IMAGE') {
      fabric.FabricImage.fromURL(mediaUrl, { crossOrigin: 'anonymous' })
        .then((img) => {
          // 计算适合画布的缩放比例
          const canvasWidth = canvas.getWidth()
          const canvasHeight = canvas.getHeight()
          const scaleX = canvasWidth / (img.width || 1)
          const scaleY = canvasHeight / (img.height || 1)
          const scale = Math.min(scaleX, scaleY, 1)

          img.set({
            left: (canvasWidth - (img.width || 0) * scale) / 2,
            top: (canvasHeight - (img.height || 0) * scale) / 2,
            scaleX: scale,
            scaleY: scale,
            selectable: false,
            evented: false,
          })

          canvas.backgroundImage = img
          canvas.renderAll()
        })
        .catch((err) => {
          console.error('Failed to load image:', err)
        })
    } else if (mediaType === 'VIDEO') {
      // 创建视频元素
      const video = document.createElement('video')
      video.src = mediaUrl
      video.crossOrigin = 'anonymous'
      video.muted = true
      videoRef.current = video

      video.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true)
        setVideoDuration(video.duration || 100)
        const canvasWidth = canvas.getWidth()
        const canvasHeight = canvas.getHeight()
        const scaleX = canvasWidth / video.videoWidth
        const scaleY = canvasHeight / video.videoHeight
        const scale = Math.min(scaleX, scaleY, 1)

        const videoImage = new fabric.FabricImage(video, {
          left: (canvasWidth - video.videoWidth * scale) / 2,
          top: (canvasHeight - video.videoHeight * scale) / 2,
          scaleX: scale,
          scaleY: scale,
          selectable: false,
          evented: false,
        })

        canvas.backgroundImage = videoImage
        canvas.renderAll()
      })
    }
  }, [mediaUrl, mediaType])

  // 加载已有标注
  useEffect(() => {
    if (!fabricRef.current) return

    const canvas = fabricRef.current

    // 清除现有标注对象（保留背景）
    const objects = canvas.getObjects()
    objects.forEach((obj) => {
      canvas.remove(obj)
    })

    // 添加标注
    annotations.forEach((ann) => {
      let shape: fabric.Object

      if (ann.type === 'RECT') {
        shape = new fabric.Rect({
          left: ann.coordinates.x,
          top: ann.coordinates.y,
          width: ann.coordinates.width,
          height: ann.coordinates.height,
          angle: ann.coordinates.rotation || 0,
          fill: 'rgba(59, 130, 246, 0.3)',
          stroke: '#3b82f6',
          strokeWidth: 2,
          selectable: !readOnly,
        })
      } else {
        shape = new fabric.Ellipse({
          left: ann.coordinates.x,
          top: ann.coordinates.y,
          rx: ann.coordinates.width / 2,
          ry: ann.coordinates.height / 2,
          angle: ann.coordinates.rotation || 0,
          fill: 'rgba(34, 197, 94, 0.3)',
          stroke: '#22c55e',
          strokeWidth: 2,
          selectable: !readOnly,
        })
      }

      (shape as fabric.Object & { annotationId?: string }).annotationId = ann.id
      canvas.add(shape)
    })

    canvas.renderAll()
  }, [annotations, readOnly])


  // 保存标注到父组件
  const saveAnnotations = useCallback(() => {
    if (!fabricRef.current || readOnly) return

    const canvas = fabricRef.current
    const newAnnotations: Annotation[] = []

    canvas.forEachObject((obj) => {
      const annotationId = (obj as fabric.Object & { annotationId?: string }).annotationId
      if (!annotationId) return

      const isRect = obj.type === 'rect'
      obj.getBoundingRect()

      newAnnotations.push({
        id: annotationId.startsWith('temp-') ? `ann-${Date.now()}-${Math.random()}` : annotationId,
        type: isRect ? 'RECT' : 'ELLIPSE',
        coordinates: {
          x: obj.left || 0,
          y: obj.top || 0,
          width: isRect ? (obj as fabric.Rect).width || 0 : ((obj as fabric.Ellipse).rx || 0) * 2,
          height: isRect ? (obj as fabric.Rect).height || 0 : ((obj as fabric.Ellipse).ry || 0) * 2,
          rotation: obj.angle || 0,
        },
        frameTime: mediaType === 'VIDEO' ? videoTime : undefined,
      })
    })

    onAnnotationsChange(newAnnotations)
  }, [onAnnotationsChange, readOnly, mediaType, videoTime])

  // 处理绘制工具
  useEffect(() => {
    if (!fabricRef.current || readOnly) return

    const canvas = fabricRef.current

    // 根据工具设置画布行为
    if (currentTool === 'select') {
      canvas.isDrawingMode = false
      canvas.selection = true
      canvas.forEachObject((obj) => {
        obj.selectable = true
      })
    } else {
      canvas.isDrawingMode = false
      canvas.selection = false
      canvas.forEachObject((obj) => {
        obj.selectable = false
      })
    }


    // 绘制矩形或椭圆

    const handleMouseDown = (opt: any) => {
      if (currentTool === 'select') return

      const pointer = opt.scenePoint || opt.pointer || opt.absolutePointer
      if (!pointer) return

      setIsDrawing(true)
      startPointRef.current = { x: pointer.x, y: pointer.y }

      let shape: fabric.Object
      if (currentTool === 'rect') {
        shape = new fabric.Rect({
          left: pointer.x,
          top: pointer.y,
          width: 0,
          height: 0,
          fill: 'rgba(59, 130, 246, 0.3)',
          stroke: '#3b82f6',
          strokeWidth: 2,
          selectable: true,
        })
      } else {
        shape = new fabric.Ellipse({
          left: pointer.x,
          top: pointer.y,
          rx: 0,
          ry: 0,
          fill: 'rgba(34, 197, 94, 0.3)',
          stroke: '#22c55e',
          strokeWidth: 2,
          selectable: true,
        })
      }

      (shape as fabric.Object & { annotationId?: string }).annotationId = `temp-${Date.now()}`
      canvas.add(shape)
      canvas.setActiveObject(shape)
    }


    const handleMouseMove = (opt: any) => {
      if (!isDrawing || !startPointRef.current) return

      const pointer = opt.scenePoint || opt.pointer || opt.absolutePointer
      if (!pointer) return

      const activeObj = canvas.getActiveObject()
      if (!activeObj) return

      const width = Math.abs(pointer.x - startPointRef.current.x)
      const height = Math.abs(pointer.y - startPointRef.current.y)
      const left = Math.min(pointer.x, startPointRef.current.x)
      const top = Math.min(pointer.y, startPointRef.current.y)

      if (currentTool === 'rect') {
        activeObj.set({ left, top, width, height })
      } else {
        activeObj.set({ left, top });
        (activeObj as fabric.Ellipse).set({ rx: width / 2, ry: height / 2 })
      }

      canvas.renderAll()
    }

    const handleMouseUp = () => {
      if (!isDrawing) return

      setIsDrawing(false)
      startPointRef.current = null

      // 保存标注
      saveAnnotations()
    }

    canvas.on('mouse:down', handleMouseDown)
    canvas.on('mouse:move', handleMouseMove)
    canvas.on('mouse:up', handleMouseUp)

    // 对象修改后保存
    canvas.on('object:modified', saveAnnotations)

    return () => {
      canvas.off('mouse:down', handleMouseDown)
      canvas.off('mouse:move', handleMouseMove)
      canvas.off('mouse:up', handleMouseUp)
      canvas.off('object:modified', saveAnnotations)
    }
  }, [currentTool, saveAnnotations, isDrawing, readOnly])

  // 缩放控制
  const handleZoom = (delta: number) => {
    if (!fabricRef.current) return

    const newZoom = Math.max(0.1, Math.min(5, zoom + delta))
    setZoom(newZoom)
    fabricRef.current.setZoom(newZoom)
    fabricRef.current.renderAll()
  }

  // 视频控制
  const handleVideoSeek = (time: number) => {
    if (!videoRef.current) return
    videoRef.current.currentTime = time
    setVideoTime(time)
    fabricRef.current?.renderAll()
  }

  return (
    <div className="h-full flex flex-col">
      {/* 缩放控制 */}
      <div className="flex items-center gap-2 p-2 bg-base-200">
        <button className="btn btn-xs" onClick={() => handleZoom(-0.1)}>
          -
        </button>
        <span className="text-sm">{Math.round(zoom * 100)}%</span>
        <button className="btn btn-xs" onClick={() => handleZoom(0.1)}>
          +
        </button>
        <button className="btn btn-xs" onClick={() => { setZoom(1); fabricRef.current?.setZoom(1) }}>
          重置
        </button>
      </div>

      {/* 视频控制 (仅视频) */}
      {mediaType === 'VIDEO' && isVideoLoaded && (
        <div className="flex items-center gap-2 p-2 bg-base-200 border-t">
          <button
            className="btn btn-xs"
            onClick={() => videoRef.current?.play()}
          >
            播放
          </button>
          <button
            className="btn btn-xs"
            onClick={() => videoRef.current?.pause()}
          >
            暂停
          </button>
          <input
            type="range"
            className="range range-xs flex-1"
            min={0}
            max={videoDuration}
            value={videoTime}
            onChange={(e) => handleVideoSeek(Number(e.target.value))}
          />
          <span className="text-xs">
            {videoTime.toFixed(1)}s
          </span>
        </div>
      )}

      {/* 画布容器 */}
      <div ref={containerRef} className="flex-1 overflow-hidden">
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}
