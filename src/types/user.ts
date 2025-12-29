// 用户相关类型定义

export enum Role {
  ADMIN = 'ADMIN',
  LABELER = 'LABELER',
  CHECKER = 'CHECKER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithStats extends User {
  labeledCount?: number;
  checkedCount?: number;
}

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
  role: Role;
}

export interface UpdateUserInput {
  username?: string;
  email?: string;
  password?: string;
  role?: Role;
  status?: UserStatus;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthPayload {
  userId: string;
  username: string;
  email: string;
  role: Role;
  status: UserStatus;
}

export interface SessionUser {
  id: string;
  username: string;
  email: string;
  role: Role;
  status: UserStatus;
}
