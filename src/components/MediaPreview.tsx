'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

type MediaType = 'picture' | 'video'

export interface PreviewItem {
  id: string
  type: MediaType
  file_name?: string
}

interface PreviewContextValue {
  openPreview: (items: PreviewItem[], index?: number) => void
  closePreview: () => void
  next: () => void
  prev: () => void
  isOpen: boolean
}

const PreviewContext = createContext<PreviewContextValue | null>(null)

export const usePreview = () => {
  const ctx = useContext(PreviewContext)
  if (!ctx) throw new Error('usePreview must be used within PreviewProvider')
  return ctx
}

export const MediaPreview: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<PreviewItem[]>([])
  const [index, setIndex] = useState<number>(0)
  const [isOpen, setIsOpen] = useState(false)
  const cacheRef = useRef<Map<string, string>>(new Map())
  const [isCurrentLoaded, setIsCurrentLoaded] = useState(false)

  const openPreview = (newItems: PreviewItem[], idx: number = 0) => {
    setItems(newItems)
    setIndex(Math.max(0, Math.min(idx, newItems.length - 1)))
    setIsOpen(true)
  }

  const closePreview = () => {
    setIsOpen(false)
  }

  const next = useCallback(() => {
    setIndex(i => (i < items.length - 1 ? i + 1 : i))
  }, [items])

  const prev = () => {
    setIndex((i) => (i > 0 ? i - 1 : i))
  }

  // keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePreview()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, items, next])

  const value = useMemo(() => ({ openPreview, closePreview, next, prev, isOpen }), [next, isOpen])

  const current = items[index]

  const getUrl = (id: string) => `https://api.etutech.com/bos/api/v1/files/${id}`

  const prefetchImage = (id: string) => {
    if (!id) return
    if (cacheRef.current.has(id)) return
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      cacheRef.current.set(id, img.src)
      if (current?.id === id) setIsCurrentLoaded(true)
    }
    img.src = getUrl(id)
  }

  const prefetchVideo = (id: string) => {
    if (!id) return
    if (cacheRef.current.has(id)) return
    try {
      const video = document.createElement('video')
      video.preload = 'auto'
      video.oncanplaythrough = () => {
        cacheRef.current.set(id, video.src)
        if (current?.id === id) setIsCurrentLoaded(true)
      }
      video.src = getUrl(id)
    } catch (_e) {
      // best-effort prefetch; ignore errors
    }
  }

  // when current changes, reset loading and attempt to use cache immediately
  useEffect(() => {
    setIsCurrentLoaded(false)
    if (!current) return
    const id = current.id
    if (cacheRef.current.has(id)) {
      setIsCurrentLoaded(true)
      return
    }
    // kick off background prefetch (non-blocking)
    if (current.type === 'picture') prefetchImage(id)
    else prefetchVideo(id)
    // also prefetch adjacent items for smoother navigation
    const nextItem = items[index + 1]
    const prevItem = items[index - 1]
    if (nextItem) {
      if (nextItem.type === 'picture') prefetchImage(nextItem.id)
      else prefetchVideo(nextItem.id)
    }
    if (prevItem) {
      if (prevItem.type === 'picture') prefetchImage(prevItem.id)
      else prefetchVideo(prevItem.id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id])

  return (
    <PreviewContext.Provider value={value}>
      {children}

      {isOpen && current && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="fixed inset-0" onClick={closePreview}></div>
          <div className="relative max-w-5xl w-full mx-4">
            <div className="bg-base-100 rounded shadow-lg overflow-hidden">
              <div className="p-2 flex items-center justify-between bg-gray-900 text-white">
                <div className="truncate">{current.file_name || ''}</div>
                <div className="flex items-center gap-2">
                  {index + 1} / {items.length}
                  <button className="btn btn-sm" onClick={prev} aria-label="previous">上一张</button>
                  <button className="btn btn-sm" onClick={next} aria-label="next">下一张</button>
                  <button className="btn btn-sm" onClick={closePreview} aria-label="close">关闭</button>
                </div>
              </div>

              <div className="bg-black flex items-center justify-center relative" style={{ minHeight: 400 }}>
                {!isCurrentLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-white">
                      <svg className="animate-spin h-12 w-12" viewBox="0 0 24 24">
                        <circle
                          className="opacity-50"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {current.type === 'picture' ? (
                  <img
                    src={cacheRef.current.get(current.id) ?? `https://api.etutech.com/bos/api/v1/files/${current.id}`}
                    alt={current.file_name}
                    className="max-h-[80vh] max-w-full object-contain"
                    onLoad={() => setIsCurrentLoaded(true)}
                    decoding="async"
                    loading="eager"
                  />
                ) : (
                  <video
                    controls
                    src={cacheRef.current.get(current.id) ?? `https://api.etutech.com/bos/api/v1/files/${current.id}`}
                    className="max-h-[80vh] max-w-full"
                    autoPlay
                    preload="auto"
                    onCanPlayThrough={() => setIsCurrentLoaded(true)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </PreviewContext.Provider>
  )
}

export default MediaPreview
