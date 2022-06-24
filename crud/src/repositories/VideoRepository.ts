import { EntityRepository, Repository } from 'typeorm';
import { Video } from '../entities/Video';;

@EntityRepository(Video)
export class VideoRepository extends Repository<Video> {
  /* public async findByName(name: string): Promise<Category | undefined> {
    const category = this.findOne({
      where: { name },
    });
    return category;
  } */
}
