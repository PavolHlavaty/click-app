import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TeamEntity } from './entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClickHistoryEntity } from './entities/clickHistory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity, ClickHistoryEntity])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
