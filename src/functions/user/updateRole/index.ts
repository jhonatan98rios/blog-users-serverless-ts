import Database from "src/lib/infra/Database";
import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import { MongoDBUserTokenRepository } from "../../../lib/infra/MongoDBUserTokenRepository";
import { UpdateUserRoleService } from "./UpdateUserRoleService";
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

export const updateRoleUser = async (event) => {

  await connect();

  const userRepository = new MongoDBUserRepository()
  const userTokenRepository = new MongoDBUserTokenRepository()
  const updateUserRoleService = new UpdateUserRoleService(userRepository, userTokenRepository)
  const username = event.pathParameters.user
  const { role } = JSON.parse(event.body) 

  const updatedUser = await updateUserRoleService.execute({ username, role })

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
