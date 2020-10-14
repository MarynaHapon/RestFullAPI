// Core
import { IsEnum, IsObject, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';

// App
import { Status } from '../../../common/types';
import { AddVideoDto } from './add-video.dto';
import { AddKeynoteDto } from './add-keynote.dto';


export class CreateLessonDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsPositive()
  readonly order: number;

  @IsEnum(Status)
  readonly availability: Status;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  readonly content?: {
    videos?: AddVideoDto[];
    keynotes?: AddKeynoteDto[];
  }
}
