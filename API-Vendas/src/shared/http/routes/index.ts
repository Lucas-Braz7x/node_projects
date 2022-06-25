import { ProductController } from '@modules/controller/ProductController';
import { Router } from 'express';

const productController = new ProductController();

const routes = Router();

routes.get('/products', productController.index);
routes.get('/products/:id', productController.show);
routes.post('/products', productController.create);
routes.put('/products/:id', productController.update);
routes.delete('/products/:id', productController.delete);

export default routes;
