// API 相关类型定义

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface TaskFilterParams extends PaginationParams {
  status?: string;
  packageId?: string;
  labelerId?: string;
  checkerId?: string;
}

export interface MediaFilterParams extends PaginationParams {
  type?: 'IMAGE' | 'VIDEO';
  unassigned?: boolean;
}

export interface UserFilterParams extends PaginationParams {
  role?: string;
  status?: string;
  search?: string;
}

export interface StatisticsOverview {
  totalTasks: number;
  pendingTasks: number;
  labelingTasks: number;
  labeledTasks: number;
  checkingTasks: number;
  approvedTasks: number;
  rejectedTasks: number;
  totalUsers: number;
  totalPackages: number;
}

export interface UserStatistics {
  userId: string;
  username: string;
  role: string;
  labeledCount: number;
  checkedCount: number;
  approvedCount: number;
  rejectedCount: number;
  avgScore?: number;
}
