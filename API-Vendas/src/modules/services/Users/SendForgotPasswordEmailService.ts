import { EtherealMail } from './../../../config/mail/EtherealMail';
import { UserTokenRepository } from './../../repositories/UserTokenRepository';
import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { UsersRepository } from '@modules/repositories/UsersRepository';
import path from 'path';

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

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de senhas',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset/password?token=${token.token}`,
        },
      },
    });
  }
}
