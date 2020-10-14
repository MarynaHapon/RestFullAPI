// Core
import { IsString } from 'class-validator';

export class ExpelStudentDto {
  @IsString()
  readonly user: string;
}
