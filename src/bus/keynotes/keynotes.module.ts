// Core
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// App
import { KeynotesController } from './keynotes.controller';
import { KeynotesService } from './keynotes.service';
import { Keynote, KeynoteSchema } from './entity/keynote.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Keynote.name,
      schema: KeynoteSchema,
    }]),
  ],
  controllers: [KeynotesController],
  providers: [KeynotesService],
})
export class KeynotesModule {}
