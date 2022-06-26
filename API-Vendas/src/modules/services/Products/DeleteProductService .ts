import { ProductsRepository } from '@modules/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';

type RequestParams = {
  id: string;
};

export class DeleteProductService {
  public async execute({ id }: RequestParams): Promise<void> {
    const productRepository = getCustomRepository(ProductsRepository);

    const product = await productRepository.findOne(id);

    if (!product) throw new AppError('This product does not exist');

    await productRepository.remove(product);
  }
}
