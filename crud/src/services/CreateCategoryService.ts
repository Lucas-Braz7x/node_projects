import { getCustomRepository } from 'typeorm';
import { Category } from '../entities/Category';
import { CategoryRepository } from '../repositories/CategoryRepository';



type CategoryRequest = {
  name: string,
  description: string
}

export class CreateCategoryService {
  async execute({ name, description }: CategoryRequest): Promise<Category | Error> {
    const categoryRepository = getCustomRepository(CategoryRepository);
    //SELECT * FROM categories WHERE name=${name} LIMIT 1
    if (await categoryRepository.findOne({ name })) {
      return new Error("Category already exists")
    }

    const category = categoryRepository.create({
      name,
      description
    })

    await categoryRepository.save(category);

    return category;
  }
}