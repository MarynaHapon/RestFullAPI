// Core
import { Controller } from '@nestjs/common';

// App
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}
}
