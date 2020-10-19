// Core
import { IsPositive, IsString, IsUrl, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddVideoDto {
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
    example: 'https://lectrum.io/videos/lesson-1'
  })
  @IsUrl()
  readonly uri: string;
}
