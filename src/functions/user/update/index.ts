import Database from "src/lib/infra/Database";
import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import { UpdateUserService } from "./UpdateUserService";

Database.connect()

export const updateUser = async (event) => {
  
  const username = event.pathParameters.user
  const { currentPassword, password, passwordConfirmation } = JSON.parse(event.body)
  
  const userRepository = new MongoDBUserRepository()
  const updateUserService = new UpdateUserService(userRepository)
  const updatedUser = await updateUserService.execute({
    username, currentPassword, password, passwordConfirmation
  })

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://jhonatan-dev-rios-blog.com.br',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      updatedUser,
      null, 2
    ),
  };
};
