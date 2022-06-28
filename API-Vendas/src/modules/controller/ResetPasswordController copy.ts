import { ResetPasswordService } from '@modules/services/Users/ResetPasswordService';
import { Request, Response } from 'express';

export class ResetPasswordController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { password, token } = request.body;
    const resetPasswordService = new ResetPasswordService();

    await resetPasswordService.execute({ token, password });

    return response.status(204).json();
  }
}
