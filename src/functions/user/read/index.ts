import { ReadUserService } from "./ReadUserService";
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

export const readUser = async (event) => {

  await connect();

  const userRepository = new MongoDBUserRepository()
  const readUserService = new ReadUserService(userRepository)
  const { user } = event.pathParameters

  const foundUser = await readUserService.execute(user)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://www.jhonatan-dev-rios-blog.com.br',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      foundUser,
      null, 2
    ),
  };
};
