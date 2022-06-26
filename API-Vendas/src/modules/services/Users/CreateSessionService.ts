import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { Users } from '@modules/entities/Users';
import { UsersRepository } from '@modules/repositories/UsersRepository';
import { compare } from 'bcryptjs';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Users;
}

export class CreateSessionService {
  public async execute({
    email,
    password,
  }: IRequest): Promise<IResponse | Users> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) throw new AppError('Incorrect email', 401);

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) throw new AppError('Incorrect password', 401);

    return user;
  }
}
