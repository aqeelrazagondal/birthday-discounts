import { Injectable, Logger } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
import { config } from '../../config/config.development';

@Injectable()
export class SendgridService {
  private readonly logger = new Logger(SendgridService.name);

  constructor() {
    SendGrid.setApiKey(config.sendGridApiKey);
  }

  // sample object to send email
  // const mail = {
  //   to: email,
  //   subject: 'Greeting Message from NestJS Sendgrid',
  //   from: 'aqeelraza146@gmail.com',
  //   text: 'Hello World from NestJS Sendgrid',
  //   html: '<h1>Hello World from NestJS Sendgrid</h1>'
  // };
  /**
   * It takes a SendGrid mail object, sends it, and returns the transport object
   * @param mail - SendGrid.MailDataRequired
   * @returns The transport object.
   */
  async send(mail: SendGrid.MailDataRequired) {
    try {
      this.logger.log('Sending email... ');
      const response = await SendGrid.send(mail);
      this.logger.log(response);
      return response;
    } catch (e) {
      this.logger.error(e);
      if (e?.response?.body) {
        throw new Error(e.response.body.errors[0].message);
      }
      throw new Error(e);
    }
  }
}
