import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class TeamIdParamDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  teamId: number;
}
