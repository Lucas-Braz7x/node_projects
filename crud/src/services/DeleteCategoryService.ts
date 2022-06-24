import { getCustomRepository, getRepository } from 'typeorm';
import { CategoryRepository } from '../repositories/CategoryRepository';

export class DeleteCategoryService {
  async execute(id: string) {
    const categoryRepository = getCustomRepository(CategoryRepository);


    if (!await categoryRepository.findOne(id)) {
      return new Error("Category does not exists");
    }

    await categoryRepository.delete(id);
  }
}