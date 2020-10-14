// Core
import {
  IsString,
  IsPositive,
  IsObject,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';

class DurationDto {
  @IsString()
  readonly started: string;

  @IsString()
  readonly closed: string;
}

export class CreateClassDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsPositive()
  @Min(1)
  @Max(9999)
  readonly order: number;

  @IsObject()
  @ValidateNested()
  readonly duration: DurationDto;
}