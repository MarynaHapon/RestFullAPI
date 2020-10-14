// Core
import { IsPositive, IsString, IsUrl, Max, Min } from 'class-validator';

export class AddVideoDto {
  @IsString()
  readonly title: string;

  @IsPositive()
  @Min(1)
  @Max(999)
  readonly readonly: number;

  @IsUrl()
  readonly uri: string;
}
