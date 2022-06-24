import { getCustomRepository, getRepository } from 'typeorm';
import { Category } from '../entities/Category';
import { CategoryRepository } from '../repositories/CategoryRepository';

type CategoryUpdateRequest = {
  id: string,
  name: string,
  description: string
}


export class UpdateCategoryService {
  async execute({ id, name, description }: CategoryUpdateRequest) {
    const categoryRepository = getCustomRepository(CategoryRepository);


    const category = await categoryRepository.findOne(id);

    if (!category) {
      return new Error("Category does not exists");
    }

    category.name = name ? name : category.name;
    category.description = description ? description : category.description;

    await categoryRepository.save(category);

    return category;
  }
}