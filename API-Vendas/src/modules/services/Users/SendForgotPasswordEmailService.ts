import { UserTokenRepository } from './../../repositories/UserTokenRepository';
import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { UsersRepository } from '@modules/repositories/UsersRepository';

interface IRequest {
  email: string;
}

export class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) throw new AppError('Email address does not exist');

    const token = await userTokenRepository.generateToken(user.id);

    console.log(token);
  }
}
