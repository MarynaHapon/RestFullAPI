// Core
import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

// App
import { Public } from './common/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Post('login')
  login() {
    return this.appService.login();
  }

  @Post('logout')
  logout() {
    return this.appService.logout();
  }
}
