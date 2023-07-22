import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ClickHistoryEntity } from './clickHistory.entity';

@Entity({ name: 'team' })
export class TeamEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { unique: true, length: 32 })
  name: string;

  @OneToMany(() => ClickHistoryEntity, (click) => click.team)
  clicksPerUser: ClickHistoryEntity[];
}
