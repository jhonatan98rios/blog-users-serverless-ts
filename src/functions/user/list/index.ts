import { ListUsersService } from "./ListUsersService";
import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import Database from "src/lib/infra/Database";
import mongoose from "mongoose";
import AppError from "src/lib/domain/AppError";

let client: typeof mongoose;

async function connect() {
  if (!client) {

    try {
      client = await Database.connect();
    } catch (err) {
      return AppError.json("Erro ao conectar no banco: " + err, 500)
    }
  }
  return client;
}

export const listUsers = async () => {

  await connect();

  try {
    const userRepository = new MongoDBUserRepository()
    const listUsersService = new ListUsersService(userRepository)
  
    const users = await listUsersService.execute()
  
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://www.jhonatan-dev-rios-blog.com.br',
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
