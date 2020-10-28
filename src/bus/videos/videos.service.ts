// Core
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// App
import { Video } from './entity/video.entity';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<Video>,
  ) {}

  getAll(
    paginationQuery: PaginationQueryDto,
  ) {
    const { limit, page } = paginationQuery;
    return this.videoModel
      .find()
      .skip(page)
      .limit(limit)
      .exec();
  }

  async create(
    createVideoDto: CreateVideoDto,
  ) {
    const createdVideo = new this.videoModel(createVideoDto);
    return createdVideo.save();
    // return { hash: createdVideo._id };
  }

  async getById(
    videoHash: string,
  ) {
    let existingVideo;

    try {
      existingVideo = await this.videoModel
        .findOne({ _id: videoHash })
        .exec();
    } catch (error) {
      // @TODO log error
    }

    if (!existingVideo) {
      throw new NotFoundException(`Video ":${videoHash}" not found`);
    }

    return existingVideo;
  }

  async update(
    videoHash: string,
    updateVideoDto: UpdateVideoDto,
  ) {
    let existingVideo;

    try {
      existingVideo = await this.videoModel
        .findByIdAndUpdate({ _id: videoHash }, { $set: updateVideoDto }, { new: true })
        .exec();
    } catch (error) {
      // @TODO log error
    }

    if (!existingVideo) {
      throw new NotFoundException(`Video ":${videoHash}" not found`)
    }

    return { _id: existingVideo._id };
  }

  async remove(
    videoHash: string,
  ) {
    const existingVideo = await this.getById(videoHash)
    existingVideo.remove();
  }
}
