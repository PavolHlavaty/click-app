import axios from 'axios';

// ideally dtos would be shared between frontend and backend (monorepo)
export interface TeamDto {
  id: number;
  name: string;
  clicks: number;
}
export type GetLeaderBoardResponseDto = TeamDto[];
export async function getLeaderBoard(): Promise<GetLeaderBoardResponseDto> {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/leaderboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}

export type CreateTeamResponseDto = { id: number; name: string };
export async function createTeam(name: string): Promise<CreateTeamResponseDto> {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/team`,
    { name },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data;
}

export type GetTeamDetailResponseDto = {
  id: number;
  name: string;
  totalClicks: number;
  usersClickCount: number;
};
export async function getTeamDetail(teamName: string): Promise<GetTeamDetailResponseDto> {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/team/${teamName}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export type AddClickResponseDto = { usersClickCount: number; totalClicks: number };
export async function addClick(teamId: number): Promise<AddClickResponseDto> {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/${teamId}/click`,
    {},
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data;
}
