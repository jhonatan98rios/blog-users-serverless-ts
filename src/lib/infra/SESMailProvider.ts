/* UPGRAADE FOR V3 https://sumandev-p.medium.com/ses-sending-email-using-sdk-for-javascript-v3-63162056f820 */

import { SES } from 'aws-sdk';
import AppError from '../domain/AppError';
import * as dotenv from 'dotenv'

dotenv.config()

export interface ISendMail {
  from: string,
  to: string
  subject: string
  body: string
}


class SESMailProvider {
  public client: SES

  constructor() {
    this.client = new SES({
      accessKeyId: process.env.CLOUD_ACCESS_KEY_ID,
      secretAccessKey: process.env.CLOUD_SECRET_ACCESS_KEY,
      region: 'us-east-1',
    })
  }

  public async sendMail({ from, to, subject, body }: ISendMail) {

    const params = {
      Source: from,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: body,
          },
        }
      },
    }

    try {
      await this.client.sendEmail(params).promise()
      console.log('E-mail sent successfully!')

    } catch (err) {
      console.log(err)
      return AppError.json(`Erro ao enviar o e-mail`)
    }
  }
}


export default SESMailProvider
