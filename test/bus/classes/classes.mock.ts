// App
import { CreateClassDto } from '../../../src/bus/classes/dto/create-class.dto';
import { UpdateClassDto } from '../../../src/bus/classes/dto/update-class.dto';

export const classToCreate: CreateClassDto = {
  title: 'Class 1',
  description: 'class description',
  order: 1,
  duration: {
    started: new Date(1327571510417),
    closed: new Date(1327571510417),
  },
};

export const classToUpdate: UpdateClassDto = {
  title: 'Class React',
  description: 'class description',
  order: 1,
  duration: {
    started: new Date(1327571510417),
    closed: new Date(1327571510417),
  },
}

export const classWithInvalidFields = {
  title: 'Class 1',
  order: 1,
  duration: {
    started: new Date(1327571510417),
    closed: new Date(1327571510417),
  }
};

export const classToExpect = {
  title: 'Class 1',
  description: 'class description',
  order: 1,
  duration: {
    started: '2012-01-26T09:51:50.417Z',
    closed: '2012-01-26T09:51:50.417Z'
  },
};
