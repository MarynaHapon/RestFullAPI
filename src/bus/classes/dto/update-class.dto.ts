// Core
import { PartialType } from '@nestjs/swagger';

// App
import { CreateClassDto } from './create-class.dto';

export class UpdateClassDto extends PartialType(CreateClassDto) {}
