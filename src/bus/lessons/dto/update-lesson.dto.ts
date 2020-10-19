// Core
import { PartialType } from '@nestjs/swagger';

// App
import { CreateLessonDto } from './create-lesson.dto';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {}
