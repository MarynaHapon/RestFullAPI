// Core
import {
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// App
import { Role, Sex } from '../../../common/types';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'jdoe@example.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: '+380731111111',
  })
  @IsPhoneNumber('UA')
  readonly phone: string;

  @ApiProperty({
    example: 'ab12345Cd',
  })
  @IsString()
  readonly password: string;

  @ApiProperty({
    example: Sex.f,
  })
  @IsEnum(Sex)
  readonly sex: Sex;

  @ApiProperty({
    example: Role.teacher,
  })
  @IsOptional()
  @IsEnum(Role)
  readonly role?: Role;
}
