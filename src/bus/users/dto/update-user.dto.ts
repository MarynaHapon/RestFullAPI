// Core
import { PartialType } from '@nestjs/swagger';

// App
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
