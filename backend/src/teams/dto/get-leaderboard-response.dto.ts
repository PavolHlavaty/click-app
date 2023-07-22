import { TeamEntity } from '../entities/team.entity';

export class GetLeaderBoardResponseDto {
  id: number;
  name: string;
  clicks: number;

  constructor(teamWithTotalClicks: TeamEntity & { totalClicks: number }) {
    this.id = teamWithTotalClicks.id;
    this.name = teamWithTotalClicks.name;
    this.clicks = teamWithTotalClicks.totalClicks;
  }
}
