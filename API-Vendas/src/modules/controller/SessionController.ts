import { Request, Response } from 'express';
import { CreateSessionService } from '@modules/services/Users/CreateSessionService';

export class SessionController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, password } = request.body;
    const createSession = new CreateSessionService();

    const user = await createSession.execute({ email, password });

    return response.json(user);
  }
}
