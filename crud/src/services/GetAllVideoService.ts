import { getCustomRepository, getRepository } from 'typeorm';
import { Video } from '../entities/Video';
import { VideoRepository } from '../repositories/VideoRepository';

export class GetAllVideoService {
  async execute() {
    const videoRepository = getCustomRepository(VideoRepository);

    const videos = await videoRepository.find({
      relations: ['category']
    });

    return videos;
  }
}