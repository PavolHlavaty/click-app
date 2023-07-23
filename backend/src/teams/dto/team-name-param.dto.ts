import { IsString } from 'class-validator';

export class TeamNameParamDto {
  @IsString()
  teamName: string;
}
