import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../entities/Category';;

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  /* public async findByName(name: string): Promise<Category | undefined> {
    const category = this.findOne({
      where: { name },
    });
    return category;
  } */
}
