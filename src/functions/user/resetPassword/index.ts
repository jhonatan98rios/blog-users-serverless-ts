import Database from "src/lib/infra/Database";
import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import { ResetPasswordService } from "./ResetPasswordService";

Database.connect()

export const resetPassword = async (event) => {

  const { mail, token, password, passwordConfirmation } = JSON.parse(event.body)

  const userRepository = new MongoDBUserRepository()
  const resetPasswordService = new ResetPasswordService(userRepository)

  const updatedUser = await resetPasswordService.execute({ 
    mail, token, password, passwordConfirmation 
  })

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://jhonatan-dev-rios-blog.vercel.app',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      updatedUser,
      null, 2
    ),
  };
};
