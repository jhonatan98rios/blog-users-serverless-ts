import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import { MongoDBUserTokenRepository } from "../../../lib/infra/MongoDBUserTokenRepository";
import { LogoutSessionService } from "./LogoutSessionService";


export const logout = async (event) => {

  const { user } = event.pathParameters

  const userRepository = new MongoDBUserRepository()
  const userTokenRepository = new MongoDBUserTokenRepository()
  const logoutService = new LogoutSessionService(userRepository, userTokenRepository)

  await logoutService.execute(user)

  return {
    statusCode: 202,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
};
