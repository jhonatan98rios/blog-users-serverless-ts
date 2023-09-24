import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import { UpdateUserService } from "./UpdateUserService";

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
    body: JSON.stringify(
      updatedUser,
      null, 2
    ),
  };
};
