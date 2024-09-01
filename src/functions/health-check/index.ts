import AppError from "src/lib/domain/AppError";
import Database from "src/lib/infra/Database";
import mongoose from 'mongoose'

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

export const healthCheck = async (event) => {

  await connect();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://www.jhonatan-dev-rios-blog.com.br', 
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      { status: 200 },
      null, 2
    ),
  };
};
