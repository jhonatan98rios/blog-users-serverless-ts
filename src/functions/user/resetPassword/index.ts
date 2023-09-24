import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import { ResetPasswordService } from "./ResetPasswordService";

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
