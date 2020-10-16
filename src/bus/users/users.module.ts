// Core
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// App
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './entity/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema,
    }])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
