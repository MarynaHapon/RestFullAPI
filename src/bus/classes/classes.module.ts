// Core
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// App
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { Class, ClassSchema } from './entity/class.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Class.name,
      schema: ClassSchema,
    }])
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
