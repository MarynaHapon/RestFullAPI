// App
import { Keynote } from './keynote.entity';
import { Video } from './video.entity';
import { Status } from '../../../common/types';

export class Lesson {
  title: string;
  description: string;
  order: number;
  availability: Status;
  content: {
    videos: Video[];
    keynotes: Keynote[];
  }
}
