// Core
import { PartialType } from '@nestjs/swagger';

// App
import { CreateVideoDto } from './create-video.dto';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {}
