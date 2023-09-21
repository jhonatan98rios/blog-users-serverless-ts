import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import * as AWSXRay from 'aws-xray-sdk'
import { ResetPasswordService } from "./ResetPasswordService";

AWSXRay.captureAWS(require('aws-sdk'))

export const resetPassword = async (event) => {

  const { mail, token, password, passwordConfirmation } = JSON.parse(event.body)

  const userRepository = new MongoDBUserRepository()
  const resetPasswordService = new ResetPasswordService(userRepository)

  const updatedUser = await resetPasswordService.execute({ 
    mail, token, password, passwordConfirmation 
  })

  return {
    statusCode: 200,
    body: JSON.stringify(
      updatedUser,
      null, 2
    ),
  };
};
