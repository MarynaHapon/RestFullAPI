// App
import { Role, Sex } from '../../../common/types';

export class User {
  name: string;
  email: string;
  phone: string;
  password: string;
  sex: Sex;
  role?: Role;
}
