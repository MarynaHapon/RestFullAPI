// Core
import { PartialType } from '@nestjs/mapped-types';

// App
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
