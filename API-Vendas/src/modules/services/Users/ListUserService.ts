import { UsersRepository } from '@modules/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import { Users } from '@modules/entities/Users';

export class ListUserService {
  public async execute(): Promise<Users[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return users;
  }
}
