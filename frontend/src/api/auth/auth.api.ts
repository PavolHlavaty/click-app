import axios from 'axios';

export type LoginResponseDto = { accessToken: string };
export async function login(email: string, password: string): Promise<LoginResponseDto> {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
}
