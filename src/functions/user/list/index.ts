import { ListUsersService } from "./ListUsersService";
import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import Database from "src/lib/infra/Database";

Database.connect()

export const listUsers = async () => {

  try {
    const userRepository = new MongoDBUserRepository()
    const listUsersService = new ListUsersService(userRepository)
  
    const users = await listUsersService.execute()
  
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://jhonatan-dev-rios-blog.vercel.app',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(
          users,
        null, 2
      ),
    };
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }

};
