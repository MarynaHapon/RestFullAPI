// Core
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  login(): string {
    return 'login';
  }

  logout(): string {
    return 'logout';
  }
}
