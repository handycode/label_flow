// 任务相关类型定义
import type { Annotation } from './annotation'
import type { User } from './user'

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export enum PackageStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED',
}

export enum TaskStatus {
  PENDING = 'PENDING',
  LABELING = 'LABELING',
  LABELED = 'LABELED',
  CHECKING = 'CHECKING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface MediaResource {
  id: string;
  s3Key: string;
  s3Url: string;
  type: MediaType;
  fileName: string;
  fileSize: number;
  duration?: number | null;
  width?: number | null;
  height?: number | null;
  autoNumber: number;
  createdAt: Date;
}

export interface TaskPackage {
  id: string;
  name: string;
  description?: string | null;
  status: PackageStatus;
  totalCount: number;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskPackageWithStats extends TaskPackage {
  pendingCount: number;
  labelingCount: number;
  labeledCount: number;
  checkingCount: number;
  approvedCount: number;
  rejectedCount: number;
  createdBy?: User;
}

export interface Task {
  id: string;
  packageId: string;
  mediaId: string;
  status: TaskStatus;
  labelerId?: string | null;
  checkerId?: string | null;
  assignedAt?: Date | null;
  labeledAt?: Date | null;
  checkedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskWithDetails extends Task {
  media: MediaResource;
  labeler?: User | null;
  checker?: User | null;
  annotations?: Annotation[];
  metadata?: TaskMetadata | null;
}

export interface TaskMetadata {
  id: string;
  taskId: string;
  remarks?: string | null;
  videoClips?: VideoClip[] | null;
  croppedAreas?: CropArea[] | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoClip {
  id: string;
  startTime: number;
  endTime: number;
  frames?: VideoFrame[];
}

export interface VideoFrame {
  time: number;
  imageUrl?: string;
}

export interface CropArea {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  frameTime?: number;
}

export interface QualityScore {
  id: string;
  taskId: string;
  score: number; // 1-5
  createdById: string;
  createdAt: Date;
}

export interface OperationLog {
  id: string;
  taskId: string;
  userId: string;
  action: string;
  oldStatus?: string | null;
  newStatus?: string | null;
  details?: Record<string, unknown> | null;
  createdAt: Date;
}

// 创建/更新输入类型
export interface CreatePackageInput {
  name: string;
  description?: string;
  mediaIds: string[];
}

export interface UpdatePackageInput {
  name?: string;
  description?: string;
  status?: PackageStatus;
}

export interface TaskSubmitInput {
  annotations: Annotation[];
  metadata?: {
    remarks?: string;
    videoClips?: VideoClip[];
    croppedAreas?: CropArea[];
  };
}

export interface TaskReviewInput {
  score: number;
  approved: boolean;
}
