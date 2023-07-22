import { IsString } from 'class-validator';

export class CreateTeamBodyDto {
  @IsString()
  name: string;
}
