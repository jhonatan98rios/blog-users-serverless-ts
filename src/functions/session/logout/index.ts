import Database from "src/lib/infra/Database";
import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import { MongoDBUserTokenRepository } from "../../../lib/infra/MongoDBUserTokenRepository";
import { LogoutSessionService } from "./LogoutSessionService";

Database.connect()

export const logout = async (event) => {

  const { user } = event.pathParameters

  const userRepository = new MongoDBUserRepository()
  const userTokenRepository = new MongoDBUserTokenRepository()
  const logoutService = new LogoutSessionService(userRepository, userTokenRepository)

  await logoutService.execute(user)

  return {
    statusCode: 202,
    headers: {
      'Access-Control-Allow-Origin': 'https://jhonatan-dev-rios-blog.vercel.app',
      'Access-Control-Allow-Credentials': true,
    },
  };
};
