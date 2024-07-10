import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { User } from '../user/entities/user.entity';
import { SuggestionService } from '../suggestion/suggestion.service';
import { config } from '../../config/config.development';
import { SendgridService } from './sendgrid.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly suggestionService: SuggestionService,
    private readonly sendgridService: SendgridService,
  ) {}

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.emailConfig.auth.user,
      pass: config.emailConfig.auth.pass,
    },
  });

  async sendBirthdayEmail(
    user: User,
    promo: {
      code: string;
      userId: number;
      expiryDate: Date;
    },
  ) {
    // Fetch suggested products for the user
    const suggestedProducts = await this.suggestionService.findAll({
      userId: user.id,
      limit: 5,
      offset: 0,
    });

    // Generate the product suggestions text
    const productSuggestions = suggestedProducts.rows
      .map(
        (suggestion) =>
          `${suggestion.product.name} - ${suggestion.product.description}`,
      )
      .join('\n');

    // Generate the email content
    const mailOptions = {
      from: config.emailConfig.fromEmail,
      to: user.email,
      subject: 'Happy Birthday! Enjoy your discount and product suggestions',
      text: `Dear ${user.name},

      Happy Birthday! Use the code ${promo.code} to get a discount on your next purchase.

      Here are some products we think you might like:
      ${productSuggestions}
      
      Click the link below to explore more:
      ${config.applicationRedirectUrl}
      
      Best regards,
      Your Company`,
    };
    console.log('-------------- sending email --------------');
    console.log(mailOptions);
    try {
      // await this.transporter.sendMail(mailOptions);
      // sending email through send grid which is more secure
      await this.sendgridService.send(mailOptions);
    } catch (e) {
      console.log('-------------- error sending email --------------');
    }
  }
}
