import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { Users } from '@modules/entities/Users';
import { UsersRepository } from '@modules/repositories/UsersRepository';
import path from 'path';
import { upload } from '@config/upload';
import fs from 'fs';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

export class UpdateUserAvatarService {
  public async execute({ avatarFileName, userId }: IRequest): Promise<Users> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(userId);

    if (!user) throw new AppError('User not found');

    if (user.avatar) {
      const userAvatarFilePath = path.join(upload.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
  }
}
