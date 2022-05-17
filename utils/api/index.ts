import axios from "axios";
import { CreateUserDto, LoginUserDto, AuthUserResponse } from "./types";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

export const UserApi = {
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

  async getMe(token: string) {
    const { data } = await instance.get<AuthUserResponse>("users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
};
