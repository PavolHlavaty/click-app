import { TeamEntity } from '../entities/team.entity';

export class GetTeamDetailResponseDto {
  id: number;
  name: string;
  totalClicks: number;
  usersClickCount: number;

  constructor(
    data: TeamEntity & { totalClicks: number; usersClickCount: number },
  ) {
    this.id = data.id;
    this.name = data.name;
    this.totalClicks = data.totalClicks;
    this.usersClickCount = data.usersClickCount;
  }
}
