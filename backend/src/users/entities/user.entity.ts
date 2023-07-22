import { ClickHistoryEntity } from 'src/teams/entities/clickHistory.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { unique: true, length: 256 })
  email: string;

  @Column({ length: 256 })
  password: string;

  @Column({ length: 256 })
  salt: string;

  @OneToMany(() => ClickHistoryEntity, (click) => click.user)
  clicksForTeam: ClickHistoryEntity[];
}
