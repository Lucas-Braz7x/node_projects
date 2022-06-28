import { UserTokenRepository } from '../../repositories/UserTokenRepository';
import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { UsersRepository } from '@modules/repositories/UsersRepository';
import dayjs from 'dayjs';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

export class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) throw new AppError('Token does not exist');

    const user = await usersRepository.findById(userToken.userId);

    if (!user) throw new AppError('User does not exist');

    const compareDate = dayjs(userToken.created_at).add(2, 'h');
    const now = dayjs();

    if (now.isAfter(compareDate)) throw new AppError('Token expired');

    user.password = await hash(password, 7);

    await usersRepository.save(user);
  }
}
