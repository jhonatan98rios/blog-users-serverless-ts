import Database from "src/lib/infra/Database";
import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import { MongoDBUserTokenRepository } from "../../../lib/infra/MongoDBUserTokenRepository";
import { CheckInSessionService } from "./CheckInSessionService";
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

export const checkin = async (event) => {

  await connect()

  const { token } = JSON.parse(event.body)

  const userRepository = new MongoDBUserRepository()
  const userTokenRepository = new MongoDBUserTokenRepository()
  const checkInSession = new CheckInSessionService(userRepository, userTokenRepository)

  const session = await checkInSession.execute(token)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://www.jhonatan-dev-rios-blog.com.br',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      session,
      null, 2
    ),
  };
};
