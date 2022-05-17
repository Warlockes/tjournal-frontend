import { AxiosInstance } from "axios";
import { CreateUserDto, LoginUserDto, AuthUserResponse } from "./types";

export const UserApi = (instance: AxiosInstance) => ({
  async register(dto: CreateUserDto) {
    const { data } = await instance.post<
      CreateUserDto,
      { data: AuthUserResponse }
    >("/auth/register", dto);

    return data;
  },

  async login(dto: LoginUserDto) {
    const { data } = await instance.post<
      LoginUserDto,
      { data: AuthUserResponse }
    >("/auth/login", dto);

    return data;
  },

  async getMe() {
    const { data } = await instance.get<AuthUserResponse>("users/me");

    return data;
  },
});
