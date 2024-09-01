import { CreateUserService } from "./CreateUserService";
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

export const createUser = async (event) => {

  await connect();

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
