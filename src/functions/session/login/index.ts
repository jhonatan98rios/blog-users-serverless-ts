import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import * as AWSXRay from 'aws-xray-sdk'
import { MongoDBUserTokenRepository } from "../../../lib/infra/MongoDBUserTokenRepository";
import { CreateSessionService } from "./CreateSessionService";

AWSXRay.captureAWS(require('aws-sdk'))

export const login = async (event) => {

  const { user, password } = JSON.parse(event.body)

  const userRepository = new MongoDBUserRepository()
  const userTokenRepository = new MongoDBUserTokenRepository()
  const createSession = new CreateSessionService(userRepository, userTokenRepository)

  const session = await createSession.execute({
    user, password
  })

  return {
    statusCode: 200,
    body: JSON.stringify(
      session,
      null, 2
    ),
  };
};
