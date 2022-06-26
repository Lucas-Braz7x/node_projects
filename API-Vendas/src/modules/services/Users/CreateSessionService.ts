import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { Users } from '@modules/entities/Users';
import { UsersRepository } from '@modules/repositories/UsersRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { auth } from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Users;
  token: string;
}

export class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) throw new AppError('Incorrect email', 401);

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) throw new AppError('Incorrect password', 401);

    const token = sign(
      {
        name: user.name,
        avatar: user.avatar,
      },
      auth.secret,
      {
        subject: user.id,
        expiresIn: auth.expiresIn,
      },
    );

    return { user, token };
  }
}
