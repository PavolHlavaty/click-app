import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamBodyDto } from './dto/create-team-body.dto';
import { CreateTeamResponseDto } from './dto/create-team-response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetLeaderBoardResponseDto } from './dto/get-leaderboard-response.dto';
import { User } from 'src/auth/decorators/user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AddClickResponseDto } from './dto/add-click-response.dto';
import { GetMyClicksResponseDto } from './dto/get-my-clicks-response.dto';
import { TeamIdParamDto } from './dto/team-id-param.dto';

@Controller()
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('team')
  async create(
    @Body() createTeamDto: CreateTeamBodyDto,
  ): Promise<CreateTeamResponseDto> {
    const team = await this.teamsService.create(createTeamDto);
    return new CreateTeamResponseDto(team);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':teamId/click')
  addClick(
    @Param() params: TeamIdParamDto,
    @User() user: UserEntity,
  ): Promise<AddClickResponseDto> {
    return this.teamsService.addClickAndGetStats(params.teamId, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('leaderboard')
  async getLeaderBoard(): Promise<GetLeaderBoardResponseDto[]> {
    const leaderBoardData = await this.teamsService.getLeaderBoard();
    return leaderBoardData.map((team) => new GetLeaderBoardResponseDto(team));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':teamId/my-clicks')
  async getMyClicks(@Param() params: TeamIdParamDto, @User() user: UserEntity) {
    console.log(params, params.teamId);
    const usersClickCount = await this.teamsService.getUsersClicksPerTeam(
      params.teamId,
      user.id,
    );
    return new GetMyClicksResponseDto(usersClickCount);
  }
}
