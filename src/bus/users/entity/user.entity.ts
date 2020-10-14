export const enum Sex {
  m,
  f,
}

export const enum Role {
  newbie,
  student,
  teacher,
}

export class User {
  name: string;
  email: string;
  phone: string;
  password: string;
  sex: Sex;
  role?: Role;
}
