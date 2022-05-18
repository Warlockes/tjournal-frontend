import { OutputData } from "@editorjs/editorjs";

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface CreateUserDto extends LoginUserDto {
  fullName: string;
}

export interface CreatePostDto {
  title: string;
  body: OutputData["blocks"];
  category?: string;
  tags?: string;
}

export interface UpdatePostDto extends Partial<CreatePostDto> {}

export interface UserResponse {
  email: string;
  fullName: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  access_token: string;
}

export interface PostItem {
  title: string;
  body: OutputData["blocks"];
  description: string;
  id: number;
  tags: string | null;
  category: string | null;
  createdAt: string;
  updatedAt: string;
  views: number;
  user: UserResponse;
}
