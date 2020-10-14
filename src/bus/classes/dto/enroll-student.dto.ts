// Core
import { IsString, IsEnum, IsOptional } from 'class-validator';

// App
import { Status } from '../../../common/types';

export class EnrollStudentDto {
  @IsString()
  readonly user: string;

  @IsEnum(Status)
  readonly status: Status;

  @IsString()
  @IsOptional()
  readonly notes: string;
}
