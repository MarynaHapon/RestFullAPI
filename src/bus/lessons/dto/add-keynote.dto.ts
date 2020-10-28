// Core
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddKeynoteDto {
  @ApiProperty({
    example: '5f907d27082a6c246a8d7877'
  })
  @IsString()
  readonly keynoteHash: string;
}
