// App
import { Keynote } from './keynote.entity';
import { Video } from './video.entity';

export const enum Availability {
  standard,
  select,
  premium,
}

export class Lesson {
  title: string;
  description: string;
  order: number;
  availability: Availability;
  content: {
    videos: [Video];
    keynotes: [Keynote];
  }
}
