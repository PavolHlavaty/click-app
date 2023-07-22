import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateTeamBodyDto } from './dto/create-team-body.dto';
import { TeamEntity } from './entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostgresError } from 'pg-error-enum';
import { ClickHistoryEntity } from './entities/clickHistory.entity';
import { AddClickResponseDto } from './dto/add-click-response.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(TeamEntity)
    private teamsRepository: Repository<TeamEntity>,
    @InjectRepository(ClickHistoryEntity)
    private clickHistoryRepository: Repository<ClickHistoryEntity>,
  ) {}

  async create(createTeamDto: CreateTeamBodyDto): Promise<TeamEntity> {
    const team = new TeamEntity();
    team.name = createTeamDto.name;
    try {
      await this.teamsRepository.save(team);
    } catch (error) {
      if (error.code === PostgresError.UNIQUE_VIOLATION) {
        throw new ConflictException('Team name already exists');
      }
    }

    return team;
  }

  async getLeaderBoard(): Promise<(TeamEntity & { totalClicks: number })[]> {
    const teamsClickData = await this.teamsRepository.find({
      relations: ['clicksPerUser'],
    });
    const teamsWithTotalClicks = teamsClickData.map((team) => ({
      ...team,
      totalClicks: team.clicksPerUser.reduce(
        (acc, curr) => acc + curr.clickCount,
        0,
      ),
    }));

    // sort teams by total clicks in descending order
    teamsWithTotalClicks.sort((a, b) => b.totalClicks - a.totalClicks);

    return teamsWithTotalClicks;
  }

  async addClick(teamId: number, userId: number): Promise<ClickHistoryEntity> {
    let clickHistory = await this.clickHistoryRepository.findOne({
      where: { teamId, userId },
    });

    if (clickHistory) {
      // if click history exists, increment click count
      clickHistory.clickCount += 1;
      await this.clickHistoryRepository.save(clickHistory);
    } else {
      // if click history does not exist, check if team exists, if yes, create new click history
      const team = await this.teamsRepository.findOne({
        where: { id: teamId },
      });
      if (!team) {
        throw new BadRequestException('Team does not exist');
      }

      clickHistory = new ClickHistoryEntity();
      clickHistory.clickCount = 1;
      clickHistory.teamId = teamId;
      clickHistory.userId = userId;
      await this.clickHistoryRepository.save(clickHistory);
    }

    return clickHistory;
  }

  async getTotalClicksPerTeam(teamId: number): Promise<number> {
    const totalClicks = await this.clickHistoryRepository.sum('clickCount', {
      teamId,
    });

    return totalClicks;
  }

  async addClickAndGetStats(
    teamId: number,
    userId: number,
  ): Promise<AddClickResponseDto> {
    const usersClickHistory = await this.addClick(teamId, userId);
    const totalClicks = await this.getTotalClicksPerTeam(teamId);
    return new AddClickResponseDto(usersClickHistory.clickCount, totalClicks);
  }

  async getUsersClicksPerTeam(teamId: number, userId: number): Promise<number> {
    const clickHistory = await this.clickHistoryRepository.findOne({
      where: { teamId, userId },
    });

    if (!clickHistory) {
      return 0;
    }

    return clickHistory.clickCount;
  }
}
