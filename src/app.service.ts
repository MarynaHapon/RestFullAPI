// Core
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  login(): string {
    return 'login';
  }

  logout(): string {
    return 'logout';
  }
}
