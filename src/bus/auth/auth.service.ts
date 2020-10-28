// Core
import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

// App
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private usersService: UsersService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getByEmail(username);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(
    request: Request,
    response: Response,
  ): Promise<void> {
    const apiKey = this.configService
      .get('api.key');

    const authHeader = request
      .header('auth');

    const decodedAuthHeader = authHeader && Buffer
      .from(authHeader, 'base64')
      .toString('latin1');

    const [email, password] = decodedAuthHeader
      .split(':');

    const existingUser = await this.usersService
      .getByEmail(email);

    if (existingUser.password === password) {
      response.cookie('auth', apiKey, { httpOnly: true, path: '*' });
      response.send();
    }
  }

  async logout(
    response: Response,
  ) {
    response.cookie('auth', '', { expires: new Date(0), httpOnly: true });
    response.send();
  }
}
