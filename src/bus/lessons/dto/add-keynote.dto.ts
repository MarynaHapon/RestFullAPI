// Core
import { IsPositive, IsString, Min, Max, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddKeynoteDto {
  @ApiProperty({
    example: 'Node.js introduction'
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: '9'
  })
  @IsPositive()
  @Min(1)
  @Max(999)
  readonly order: number;

  @ApiProperty({
    example: 'https://lectrum.io/keynotes/lesson-1'
  })
  @IsUrl()
  readonly uri: string;
}
