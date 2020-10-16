// Core
import { IsArray, IsEnum, IsObject, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';

// App
import { Status } from '../../../common/types';
import { AddVideoDto } from './add-video.dto';
import { AddKeynoteDto } from './add-keynote.dto';

class ContentDto {
  @IsArray()
  @ValidateNested()
  readonly videos: AddVideoDto[];

  @IsArray()
  @ValidateNested()
  readonly keynotes: AddKeynoteDto[];
}

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
  readonly content: ContentDto;
}
