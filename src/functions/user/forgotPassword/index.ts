import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import SESMailProvider from "../../../lib/infra/SESMailProvider";
import { ForgotPasswordService } from "./ForgotPasswordService";

export const forgotPassword = async (event) => {
  
  const { mail } = JSON.parse(event.body)

  const userRepository = new MongoDBUserRepository()
  const mailProvider = new SESMailProvider()
  const forgotPasswordService = new ForgotPasswordService(userRepository, mailProvider)

  const result = await forgotPasswordService.execute(mail)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      result,
      null, 2
    ),
  };
};
