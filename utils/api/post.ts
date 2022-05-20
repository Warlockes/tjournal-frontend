import { AxiosInstance } from "axios";
import { CreatePostDto, PostItem, SearchPostDto, UpdatePostDto } from "./types";

export const PostApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<PostItem[]>("/posts");

    return data;
  },

  async getOne(id: number) {
    const { data } = await instance.get<PostItem>(`/posts/${id}`);

    return data;
  },

  async createPost(dto: CreatePostDto) {
    const { data } = await instance.post<CreatePostDto, { data: PostItem }>(
      "/posts",
      dto
    );

    return data;
  },

  async updatePost(postId: number, dto: UpdatePostDto) {
    const { data } = await instance.patch<UpdatePostDto, { data: PostItem }>(
      `/posts/${postId}`,
      dto
    );

    return data;
  },

  async search(dto: SearchPostDto) {
    const { data } = await instance.get<{ posts: PostItem[]; total: number }>(
      "/posts/search",
      { params: dto }
    );

    return data;
  },
});
