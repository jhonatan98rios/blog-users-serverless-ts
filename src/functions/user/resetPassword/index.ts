import Database from "src/lib/infra/Database";
import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import { ResetPasswordService } from "./ResetPasswordService";
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

export const resetPassword = async (event) => {

  await connect();

  const { mail, token, password, passwordConfirmation } = JSON.parse(event.body)

  const userRepository = new MongoDBUserRepository()
  const resetPasswordService = new ResetPasswordService(userRepository)

  const updatedUser = await resetPasswordService.execute({ 
    mail, token, password, passwordConfirmation 
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
