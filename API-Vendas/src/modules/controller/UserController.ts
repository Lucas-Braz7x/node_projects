import { CreateUserService } from '@modules/services/Users/CreateUserService';
import { ListUserService } from '@modules/services/Users/ListUserService';
import { Request, Response } from 'express';

export class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUserService();

    const users = await listUsers.execute();

    return response.json(users);
  }

  public async create(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    return response.json(user);
  }
}
