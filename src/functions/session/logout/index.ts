import * as AWSXRay from 'aws-xray-sdk'
import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import { MongoDBUserTokenRepository } from "../../../lib/infra/MongoDBUserTokenRepository";
import { LogoutSessionService } from "./LogoutSessionService";

AWSXRay.captureAWS(require('aws-sdk'))

export const logout = async (event) => {

  const { user } = event.pathParameters

  const userRepository = new MongoDBUserRepository()
  const userTokenRepository = new MongoDBUserTokenRepository()
  const logoutService = new LogoutSessionService(userRepository, userTokenRepository)

  await logoutService.execute(user)

  return {
    statusCode: 202,
  };
};
