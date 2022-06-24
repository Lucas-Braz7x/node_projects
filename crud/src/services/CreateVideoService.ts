import { Category } from './../entities/Category';
import { getCustomRepository, getRepository } from 'typeorm'
import { Video } from '../entities/Video'
import { VideoRepository } from '../repositories/VideoRepository';
import { CategoryRepository } from '../repositories/CategoryRepository';

type VideoRequest = {
  name: string,
  description: string,
  duration: number,
  category_id: string
}

export class CreateVideoService {
  async execute({ name, description, duration, category_id }: VideoRequest): Promise<Video | Error> {
    const videoRepository = getCustomRepository(VideoRepository);
    const categoryRepository = getCustomRepository(CategoryRepository);


    if (!await categoryRepository.findOne(category_id)) {
      return new Error("Category does not exists")
    }

    const video = videoRepository.create({
      name,
      description,
      duration,
      category_id
    })

    await videoRepository.save(video);

    return video;
  }
}