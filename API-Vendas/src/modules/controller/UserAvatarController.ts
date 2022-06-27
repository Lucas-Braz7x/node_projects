import { UpdateUserAvatarService } from '@modules/services/Users/UpdateUserAvatarService';
import { Request, Response } from 'express';

export class UserAvatarController {
  public async update(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      avatarFileName: request.file.filename,
    });

    return response.json(user);
  }
}
