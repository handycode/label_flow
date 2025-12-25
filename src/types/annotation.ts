// 标注相关类型定义

export enum AnnotationType {
  RECT = 'RECT',
  ELLIPSE = 'ELLIPSE',
}

export interface AnnotationCoordinates {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
}

export interface Annotation {
  id: string;
  taskId: string;
  type: AnnotationType;
  coordinates: AnnotationCoordinates;
  label?: string | null;
  frameTime?: number | null;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAnnotationInput {
  taskId: string;
  type: AnnotationType;
  coordinates: AnnotationCoordinates;
  label?: string;
  frameTime?: number;
}

export interface UpdateAnnotationInput {
  type?: AnnotationType;
  coordinates?: Partial<AnnotationCoordinates>;
  label?: string;
}

// Canvas 相关类型
export interface CanvasShape {
  id: string;
  type: AnnotationType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  opacity: number;
  label?: string;
  frameTime?: number;
  isSelected?: boolean;
}

export interface CanvasTool {
  type: 'select' | 'rect' | 'ellipse' | 'pan' | 'zoom';
  cursor: string;
}

export interface CanvasState {
  shapes: CanvasShape[];
  selectedShapeId: string | null;
  currentTool: CanvasTool['type'];
  zoom: number;
  panOffset: { x: number; y: number };
  isDrawing: boolean;
  history: CanvasShape[][];
  historyIndex: number;
}
