import { ReadUserService } from "./ReadUserService";
import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import * as AWSXRay from 'aws-xray-sdk'

AWSXRay.captureAWS(require('aws-sdk'))

export const readUser = async (event) => {

  const userRepository = new MongoDBUserRepository()
  const readUserService = new ReadUserService(userRepository)
  const { user } = event.queryStringParameters

  const foundUser = await readUserService.execute(user)

  return {
    statusCode: 200,
    body: JSON.stringify(
      foundUser,
      null, 2
    ),
  };
};
