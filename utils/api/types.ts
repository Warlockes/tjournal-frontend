export interface LoginUserDto {
  email: string;
  password: string;
}

export interface CreateUserDto extends LoginUserDto {
  fullName: string;
}

export interface AuthUserResponse {
  email: string;
  fullName: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  access_token: string;
}
