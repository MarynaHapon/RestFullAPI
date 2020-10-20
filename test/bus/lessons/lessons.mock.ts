// App
import { CreateLessonDto } from '../../../src/bus/lessons/dto/create-lesson.dto';
import { UpdateLessonDto } from '../../../src/bus/lessons/dto/update-lesson.dto';
import { Status } from '../../../src/common/types';

export const lessonToCreate: CreateLessonDto = {
  title: 'Lesson 1',
  description: 'Lesson description',
  order: 1,
  availability: Status.premium,
  content: {
    videos: [{
      uri: 'https://test.io/videos/lesson-1',
      order: 1,
      title: 'Node.js introduction',
    }],
    keynotes: [{
      uri: 'https://test.io/keynotes/lesson-1',
      order: 1,
      title: 'Node.js introduction',
    }],
  },
};

export const lessonToUpdate: UpdateLessonDto = {
  title: 'Lesson React',
  description: 'Lesson description',
  order: 1,
  availability: Status.premium,
  content: {
    videos: [{
      uri: 'https://test.io/videos/lesson-1',
      order: 1,
      title: 'Node.js introduction',
    }],
    keynotes: [{
      uri: 'https://test.io/keynotes/lesson-1',
      order: 1,
      title: 'Node.js introduction',
    }],
  },
}

export const lessonWithInvalidFields = {
  title: 'Lesson React',
  description: 'Lesson description',
  order: 1,
};

export const lessonToExpect = {
  "content": {
    "videos": [
      {
        "title": "Node.js introduction",
        "order": 1,
        "uri": "https://test.io/videos/lesson-1"
      }
    ],
    "keynotes": [
      {
        "title": "Node.js introduction",
        "order": 1,
        "uri": "https://test.io/keynotes/lesson-1"
      }
    ]
  },
  "title": "Lesson 1",
  "description": "Lesson description",
  "order": 1,
  "availability": "premium",
};
