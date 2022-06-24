import { getCustomRepository, getRepository } from 'typeorm';
import { Category } from '../entities/Category';
import { CategoryRepository } from '../repositories/CategoryRepository';

export class GetAllCategoryService {
  async execute() {
    const categoryRepository = getCustomRepository(CategoryRepository);

    const categories = await categoryRepository.find();

    return categories;
  }
}