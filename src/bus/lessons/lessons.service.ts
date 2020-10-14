// Core
import { Injectable, NotFoundException } from '@nestjs/common';

// App
import { Lesson, Availability } from './entity/lesson.entity';

@Injectable()
export class LessonsService {
  private lessons: Lesson[] = [
    {
      title: 'title',
      availability: Availability.standard,
      description: 'description',
      order: 1,
      content: {
        videos: [{
          title: 'videos title',
          order: 1,
          uri: 'https://videos/title'
        }],
        keynotes: [{
          title: 'keynotes title',
          order: 1,
          uri: 'https://keynotes/title'
        }]
      }
    }
  ];

  getAll() {
    return this.lessons;
  }

  create(createLessonDto: any) {
    return this.lessons;
  }

  getById(lessonHash: string) {
    let lesson;

    if (!lesson) {
      throw new NotFoundException(`Lesson "${lessonHash}" not found`);
    }

    return this.lessons;
  }

  update(lessonHash: string, updateLessonDto) {
    return this.lessons;
  }

  remove(lessonHash: string) {
    return this.lessons;
  }

  addVideo(lessonHash: string, addVideoDto: any) {
    return this.lessons;
  }

  playVideo(param) {
    return this.lessons;
  }

  removeVideo(param) {
    return this.lessons;
  }

  addKeynote(lessonHash: string, addKeynoteDto: any) {
    return this.lessons;
  }

  getKeynote(param) {
    let keynote;

    if (!keynote) {
      throw new NotFoundException(`Keynote "${param}" not found`);
    }

    return this.lessons;
  }

  removeKeynote(param) {
    return this.lessons;
  }
}
