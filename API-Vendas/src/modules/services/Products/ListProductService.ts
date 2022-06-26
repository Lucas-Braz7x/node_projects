import { ProductsRepository } from '@modules/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import { Products } from '@modules/entities/Products';

export class ListProductService {
  public async execute(): Promise<Products[]> {
    const productRepository = getCustomRepository(ProductsRepository);

    const products = await productRepository.find();

    return products;
  }
}
