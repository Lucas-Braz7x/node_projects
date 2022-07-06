/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
import { AppDataSource } from '../../../data-source';
import { User } from '../models/User';

export const UserRepository = AppDataSource.getRepository(User).extend({
  async findByName(name: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { name },
    });
    return user;
  },

  async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { id },
    });
    return user;
  },

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { email },
    });
    return user;
  },

  async findByGithubName(github_name: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { github_name },
    });
    return user;
  },
});
