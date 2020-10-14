// Core
import { IsPositive, IsString, Min, Max, IsUrl } from 'class-validator';

export class AddKeynoteDto {
  @IsString()
  readonly title: string;

  @IsPositive()
  @Min(1)
  @Max(999)
  readonly readonly: number;

  @IsUrl()
  readonly uri: string;
}
