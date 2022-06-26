import { ProductController } from '@modules/controller/ProductController';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { UserController } from '@modules/controller/UserController';
import { SessionController } from '@modules/controller/SessionController';

const productController = new ProductController();
const userController = new UserController();
const sessionController = new SessionController();

const routes = Router();

routes.get('/products', productController.index);

routes.get(
  '/products/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productController.show,
);
routes.post(
  '/products',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  productController.create,
);
routes.put(
  '/products/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      price: Joi.number().precision(2),
      quantity: Joi.number(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productController.update,
);
routes.delete(
  '/products/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productController.delete,
);

routes.get('/users', userController.index);

routes.post(
  '/users',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

routes.post(
  '/session',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default routes;
