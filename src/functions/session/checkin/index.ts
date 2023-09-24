import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import { MongoDBUserTokenRepository } from "../../../lib/infra/MongoDBUserTokenRepository";
import { CheckInSessionService } from "./CheckInSessionService";

export const checkin = async (event) => {

  const { token } = JSON.parse(event.body)

  const userRepository = new MongoDBUserRepository()
  const userTokenRepository = new MongoDBUserTokenRepository()
  const checkInSession = new CheckInSessionService(userRepository, userTokenRepository)

  const session = await checkInSession.execute(token)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      session,
      null, 2
    ),
  };
};
