import AppError from "src/lib/domain/AppError";
import Database from "src/lib/infra/Database";

export const healthCheck = async (event) => {

  try {
    await Database.connect()
  } catch (err) {
    return AppError.json("Erro ao conectar no banco: " + err, 500)
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://jhonatan-dev-rios-blog.vercel.app', 
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      { status: 200 },
      null, 2
    ),
  };
};
