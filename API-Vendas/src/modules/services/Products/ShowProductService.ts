import { ProductsRepository } from '@modules/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import { Products } from '@modules/entities/Products';
import { AppError } from '@shared/errors/AppError';

type RequestParams = {
  id: string;
};

export class ShowProductService {
  public async execute({ id }: RequestParams): Promise<Products | undefined> {
    const productRepository = getCustomRepository(ProductsRepository);

    const product = await productRepository.findOne(id);

    if (!product) throw new AppError('This product does not exist');

    return product;
  }
}
