// Core
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// App
import { Status } from '../../../common/types';

export class EnrollStudentDto {
  @ApiProperty({
    example: '5f8aa4f269308d35c0588a3c'
  })
  @IsString()
  readonly userHash: string;

  @ApiProperty({
    example: Status.select,
  })
  @IsEnum(Status)
  readonly status: Status;

  @ApiProperty({
    example: 'отличный студент'
  })
  @IsString()
  @IsOptional()
  readonly notes: string;
}
