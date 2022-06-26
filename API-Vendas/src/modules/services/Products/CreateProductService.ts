import { ProductsRepository } from '@modules/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export class CreateProductService {
  public async execute({ name, price, quantity }: IRequest) {
    const productRepository = getCustomRepository(ProductsRepository);
    const isExistProduct = await productRepository.findByName(name);

    if (isExistProduct)
      throw new AppError('There is already one product with this name');

    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    await productRepository.save(product);

    return product;
  }
}
