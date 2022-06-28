import { EntityRepository, Repository } from 'typeorm';

import { UserToken } from '@modules/entities/UserToken';

@EntityRepository(UserToken)
export class UserTokenRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.findOne({
      where: { token },
    });
    return userToken;
  }

  public async generateToken(userId: string): Promise<UserToken | undefined> {
    const userToken = this.create({
      userId,
    });

    await this.save(userToken);

    return userToken;
  }
}
