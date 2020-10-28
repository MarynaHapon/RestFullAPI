// Core
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// App
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { Video, VideoSchema } from './entity/video.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Video.name,
      schema: VideoSchema,
    }]),
  ],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
