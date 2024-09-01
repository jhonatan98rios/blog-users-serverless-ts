import Database from "src/lib/infra/Database";
import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import { UpdateUserService } from "./UpdateUserService";
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

export const updateUser = async (event) => {

  await connect();
  
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
      'Access-Control-Allow-Origin': 'https://www.jhonatan-dev-rios-blog.com.br',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      updatedUser,
      null, 2
    ),
  };
};
