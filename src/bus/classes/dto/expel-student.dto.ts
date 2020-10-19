// Core
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExpelStudentDto {
  @ApiProperty({
    example: '5f8aa4f269308d35c0588a3c'
  })
  @IsString()
  readonly user: string;
}
