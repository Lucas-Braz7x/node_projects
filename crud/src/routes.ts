import { CreateCategoryController } from './Controller/CreateCategoryController';
import { CreateVideoController } from './Controller/CreateVideoController';
import { DeleteCategoryController } from './Controller/DeleteCategoryController';
import { GetAllCategoryController } from './Controller/GetAllCategoryController';
import { GetAllVideoController } from './Controller/GetAllVideoController';
import { UpdateCategoryController } from './Controller/UpdateCategoryController';

const routes = require('express').Router();

routes.post('/categories', new CreateCategoryController().handle)
routes.get('/categories', new GetAllCategoryController().handle)
routes.delete('/categories/:id', new DeleteCategoryController().handle)
routes.put('/categories/:id', new UpdateCategoryController().handle)

routes.post('/videos', new CreateVideoController().handle)
routes.get('/videos', new GetAllVideoController().handle)


export { routes }
