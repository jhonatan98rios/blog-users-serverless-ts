import * as AWSXRay from 'aws-xray-sdk'
import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import SESMailProvider from "../../../lib/infra/SESMailProvider";
import { ForgotPasswordService } from "./ForgotPasswordService";

AWSXRay.captureAWS(require('aws-sdk'))

export const forgotPassword = async (event) => {
  
  const { mail } = JSON.parse(event.body)

  const userRepository = new MongoDBUserRepository()
  const mailProvider = new SESMailProvider()
  const forgotPasswordService = new ForgotPasswordService(userRepository, mailProvider)

  const result = await forgotPasswordService.execute(mail)

  return {
    statusCode: 200,
    body: JSON.stringify(
      result,
      null, 2
    ),
  };
};