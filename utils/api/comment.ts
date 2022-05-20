import { AxiosInstance } from "axios";
import { CommentItem, CreateCommentDto } from "./types";

export const CommentApi = (instance: AxiosInstance) => ({
  async create(dto: CreateCommentDto) {
    const { data } = await instance.post<
      CreateCommentDto,
      { data: CommentItem }
    >("/comments", dto);

    return data;
  },

  async getAll(postId: number) {
    const { data } = await instance.get<CommentItem[]>("/comments", {
      params: { postId },
    });

    return data;
  },

  async remove(id: number) {
    return instance.delete(`/comments/${id}`);
  },
});
