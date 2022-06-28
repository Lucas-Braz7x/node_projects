import nodemailer from 'nodemailer';
import { HandlebarsMailTemplate } from './HandlebarsMailTemplate';

type EmailContact = {
  name: string;
  email: string;
};
interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface ISendEmail {
  to: EmailContact;
  from?: EmailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export class EtherealMail {
  public static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendEmail): Promise<void> {
    const mailTemplate = new HandlebarsMailTemplate();

    //Cria e configura a conta do email
    const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    //Envia o email
    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Vamo vender',
        address: from?.email || 'team@apivendas.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });

    console.log('Message send: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
