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

export interface SearchPostDto {
  title?: string;
  body?: string;
  views?: "DESC" | "ASC";
  tag?: string;
  limit?: number;
  take?: number;
}

export interface CreateCommentDto {
  postId: number;
  text: string;
}

export interface UpdateCommentDto extends Partial<CreateCommentDto> {}

export interface UserResponse {
  email: string;
  fullName: string;
  id: number;
  rating: number;
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

export interface CommentItem {
  id: number;
  text: string;
  user: UserResponse;
  post: PostItem;
  createdAt: string;
  updatedAt: string;
}

export interface ChangeRatingDto {
  action: "increment" | "decrement";
  id: number;
}
