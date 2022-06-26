import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { Users } from '@modules/entities/Users';
import { UsersRepository } from '@modules/repositories/UsersRepository';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<Users> {
    const usersRepository = getCustomRepository(UsersRepository);

    const isEmailExist = await usersRepository.findByEmail(email);

    if (isEmailExist) throw new AppError('Email address already used');

    const hashedPassword = await hash(password, 7);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}
