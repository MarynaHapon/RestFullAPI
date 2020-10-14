// Core
import {
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsString,
  IsOptional,
} from 'class-validator';

// App
import { Role, Sex } from '../../../common/types';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsPhoneNumber('UA')
  readonly phone: string;

  @IsString()
  readonly password: string;

  @IsEnum(Sex)
  readonly sex: Sex;

  @IsOptional()
  @IsEnum(Role)
  readonly role?: Role;
}
