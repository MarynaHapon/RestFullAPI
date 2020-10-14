// Core
import { PartialType } from '@nestjs/mapped-types';

// App
import { CreateLessonDto } from './create-lesson.dto';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {}
