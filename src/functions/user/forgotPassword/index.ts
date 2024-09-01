import Database from "src/lib/infra/Database";
import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import SESMailProvider from "../../../lib/infra/SESMailProvider";
import { ForgotPasswordService } from "./ForgotPasswordService";
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

export const forgotPassword = async (event) => {

  await connect();
  
  const { mail } = JSON.parse(event.body)

  const userRepository = new MongoDBUserRepository()
  const mailProvider = new SESMailProvider()
  const forgotPasswordService = new ForgotPasswordService(userRepository, mailProvider)

  const result = await forgotPasswordService.execute(mail)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://www.jhonatan-dev-rios-blog.com.br',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      result,
      null, 2
    ),
  };
};
