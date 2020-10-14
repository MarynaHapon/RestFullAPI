// Core
import { PartialType } from '@nestjs/mapped-types';

// App
import { CreateClassDto } from './create-class.dto';

export class UpdateClassDto extends PartialType(CreateClassDto) {}
