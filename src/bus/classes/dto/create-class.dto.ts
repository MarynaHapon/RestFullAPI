// Core
import {
  IsString,
  IsPositive,
  IsObject,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class DurationDto {
  @ApiProperty({
    example: '2020-10-17T19:00:16.634Z',
  })
  @IsString()
  readonly started: Date;

  @ApiProperty({
    example: '2020-10-17T19:00:16.634Z',
  })
  @IsString()
  readonly closed: Date;
}


export class CreateClassDto {
  @ApiProperty({
    example: 'Backend',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: 'Backend Online Course',
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    example: '2',
  })
  @IsPositive()
  @Min(1)
  @Max(9999)
  readonly order: number;

  @IsObject()
  readonly duration: DurationDto;
}
