import { AxiosInstance } from "axios";
import { CommentItem, CreateCommentDto, UpdateCommentDto } from "./types";

export const CommentApi = (instance: AxiosInstance) => ({
  async create(dto: CreateCommentDto) {
    const { data } = await instance.post<
      CreateCommentDto,
      { data: CommentItem }
    >("/comments", dto);

    return data;
  },

  async getAll(postId?: number) {
    const { data } = await instance.get<CommentItem[]>("/comments", {
      params: { postId },
    });

    return data;
  },

  async remove(id: number) {
    return instance.delete(`/comments/${id}`);
  },

  async getById(id: number) {
    const { data } = await instance.get<CommentItem>(`/comments/${id}`);

    return data;
  },

  async edit(id: number, dto: UpdateCommentDto) {
    const { data } = await instance.patch<
      UpdateCommentDto,
      { data: CommentItem }
    >(`/comments/${id}`, dto);

    return data;
  },
});
