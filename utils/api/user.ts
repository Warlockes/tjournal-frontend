import { AxiosInstance } from "axios";
import { CreateUserDto, LoginUserDto, UserResponse } from "./types";

export const UserApi = (instance: AxiosInstance) => ({
  async register(dto: CreateUserDto) {
    const { data } = await instance.post<CreateUserDto, { data: UserResponse }>(
      "/auth/register",
      dto
    );

    return data;
  },

  async login(dto: LoginUserDto) {
    const { data } = await instance.post<LoginUserDto, { data: UserResponse }>(
      "/auth/login",
      dto
    );

    return data;
  },

  async getMe() {
    const { data } = await instance.get<UserResponse>("users/me");

    return data;
  },

  async getAll() {
    const { data } = await instance.get<UserResponse[]>("/users");

    return data;
  },
});
