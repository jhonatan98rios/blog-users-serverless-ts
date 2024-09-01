import { CreateUserService } from "./CreateUserService";
import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import Database from "src/lib/infra/Database";

Database.connect()

export const createUser = async (event) => {

  const { user, mail, password, consent } = JSON.parse(event.body) 

  const userRepository = new MongoDBUserRepository()
  const createUserService = new CreateUserService(userRepository)

  const createdUser = await createUserService.execute({
    user, mail, password, consent
  })

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://www.jhonatan-dev-rios-blog.com.br',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      createdUser,
      null, 2
    ),
  };
};
