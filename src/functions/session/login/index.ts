import Database from "src/lib/infra/Database";
import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository"; 
import { MongoDBUserTokenRepository } from "../../../lib/infra/MongoDBUserTokenRepository";
import { CreateSessionService } from "./CreateSessionService";

Database.connect()

export const login = async (event) => {

  const { user, password } = JSON.parse(event.body)

  const userRepository = new MongoDBUserRepository()
  const userTokenRepository = new MongoDBUserTokenRepository()
  const createSession = new CreateSessionService(userRepository, userTokenRepository)

  const session = await createSession.execute({
    user, password
  })

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://jhonatan-dev-rios-blog.com.br',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      session,
      null, 2
    ),
  };
};
