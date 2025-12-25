import { create } from 'zustand'
import type { CanvasShape, CanvasTool } from '@/types'

interface AnnotationState {
  shapes: CanvasShape[];
  selectedShapeId: string | null;
  currentTool: CanvasTool['type'];
  zoom: number;
  panOffset: { x: number; y: number };

  // History for undo/redo
  history: CanvasShape[][];
  historyIndex: number;

  // Actions
  setShapes: (shapes: CanvasShape[]) => void;
  addShape: (shape: CanvasShape) => void;
  updateShape: (id: string, updates: Partial<CanvasShape>) => void;
  deleteShape: (id: string) => void;
  selectShape: (id: string | null) => void;
  setCurrentTool: (tool: CanvasTool['type']) => void;
  setZoom: (zoom: number) => void;
  setPanOffset: (offset: { x: number; y: number }) => void;

  // History actions
  undo: () => void;
  redo: () => void;
  saveToHistory: () => void;
  clearHistory: () => void;
}

export const useAnnotationStore = create<AnnotationState>((set, get) => ({
  shapes: [],
  selectedShapeId: null,
  currentTool: 'select',
  zoom: 1,
  panOffset: { x: 0, y: 0 },
  history: [],
  historyIndex: -1,

  setShapes: (shapes) => {
    set({ shapes })
    get().saveToHistory()
  },

  addShape: (shape) => {
    set((state) => ({ shapes: [...state.shapes, shape] }))
    get().saveToHistory()
  },

  updateShape: (id, updates) => {
    set((state) => ({
      shapes: state.shapes.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    }))
  },

  deleteShape: (id) => {
    set((state) => ({
      shapes: state.shapes.filter((s) => s.id !== id),
      selectedShapeId: state.selectedShapeId === id ? null : state.selectedShapeId,
    }))
    get().saveToHistory()
  },

  selectShape: (id) => set({ selectedShapeId: id }),

  setCurrentTool: (currentTool) => set({ currentTool, selectedShapeId: null }),

  setZoom: (zoom) => set({ zoom: Math.max(0.1, Math.min(5, zoom)) }),

  setPanOffset: (panOffset) => set({ panOffset }),

  undo: () => {
    const { history, historyIndex } = get()
    if (historyIndex > 0) {
      set({
        shapes: history[historyIndex - 1],
        historyIndex: historyIndex - 1,
      })
    }
  },

  redo: () => {
    const { history, historyIndex } = get()
    if (historyIndex < history.length - 1) {
      set({
        shapes: history[historyIndex + 1],
        historyIndex: historyIndex + 1,
      })
    }
  },

  saveToHistory: () => {
    const { shapes, history, historyIndex } = get()
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push([...shapes])
    set({
      history: newHistory.slice(-50), // 保留最近50条记录
      historyIndex: newHistory.length - 1,
    })
  },

  clearHistory: () => set({ history: [], historyIndex: -1 }),
}))
