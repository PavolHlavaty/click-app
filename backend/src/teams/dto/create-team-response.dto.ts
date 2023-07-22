import { TeamEntity } from '../entities/team.entity';

export class CreateTeamResponseDto {
  id: number;
  name: string;

  constructor(team: TeamEntity) {
    this.id = team.id;
    this.name = team.name;
  }
}
