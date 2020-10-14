// Core
import { Injectable, NotFoundException } from '@nestjs/common';

// App
import { Class } from './entity/class.entity';

@Injectable()
export class ClassesService {
  private classes: Class[] = [
    {
      title: 'string',
      description: 'string',
      order: 1,
      duration: {
        started: 'string',
        closed: 'string',
      }
    }
  ];

  getAll() {
    return this.classes;
  }

  create(createClassDto: any) {
    return this.classes;
  }

  getById(classHash: string) {
    let item;

    if (!item) {
      throw new NotFoundException(`Class ":${classHash}" not found`);
    }

    return item;
  }

  update(classHash: string, updateClassDto: any) {
    return this.classes;
  }

  remove(classHash: string) {
    return this.classes;
  }

  enrollStudent(classHash: string) {
    return this.classes;
  }

  expelStudent(classHash: string) {
    return this.classes;
  }
}
