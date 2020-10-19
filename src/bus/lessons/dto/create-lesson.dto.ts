// Core
import {
  IsArray,
  IsEnum,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({
    example: 'Backend'
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: 'Backend Online Course'
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    example: '5'
  })
  @IsPositive()
  readonly order: number;

  @ApiProperty({
    example: Status.select,
  })
  @IsEnum(Status)
  readonly availability: Status;

  @IsObject()
  @IsOptional()
  readonly content: ContentDto;
}
