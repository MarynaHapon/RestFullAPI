// Core
import { PartialType } from '@nestjs/swagger';

// App
import { CreateKeynoteDto } from './create-keynote.dto';

export class UpdateKeynoteDto extends PartialType(CreateKeynoteDto) {}
