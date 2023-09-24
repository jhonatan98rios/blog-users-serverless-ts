import { ReadUserService } from "./ReadUserService";
import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";

export const readUser = async (event) => {

  const userRepository = new MongoDBUserRepository()
  const readUserService = new ReadUserService(userRepository)
  const { user } = event.pathParameters

  const foundUser = await readUserService.execute(user)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      foundUser,
      null, 2
    ),
  };
};
