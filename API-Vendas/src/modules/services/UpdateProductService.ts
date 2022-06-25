import { ProductsRepository } from './../repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import { Products } from '@modules/entities/Products';
import { AppError } from '@shared/errors/AppError';

type RequestParams = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: RequestParams): Promise<Products | undefined> {
    const productRepository = getCustomRepository(ProductsRepository);

    const product = await productRepository.findOne(id);

    if (!product) throw new AppError('This product does not exist');

    const isExistProduct = await productRepository.findByName(name);

    if (isExistProduct && name != product.name)
      throw new AppError('There is already one product with this name');

    product.name = name ? name : product.name;
    product.price = price ? price : product.price;
    product.quantity = quantity ? quantity : product.quantity;

    await productRepository.save(product);

    return product;
  }
}
