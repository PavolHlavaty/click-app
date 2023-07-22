import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TeamEntity } from './team.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity({ name: 'click_history' })
export class ClickHistoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('integer')
  clickCount: number;

  @Column('integer')
  teamId: number;

  @Column('integer')
  userId: number;

  @ManyToOne(() => TeamEntity, (team) => team.clicksPerUser)
  team: TeamEntity;

  @ManyToOne(() => UserEntity, (user) => user.clicksForTeam)
  user: UserEntity;
}
