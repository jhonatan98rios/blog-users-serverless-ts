import { ListUsersService } from "./ListUsersService";
import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import * as AWSXRay from 'aws-xray-sdk'

AWSXRay.captureAWS(require('aws-sdk'))

export const listUsers = async () => {

  const userRepository = new MongoDBUserRepository()
  const listUsersService = new ListUsersService(userRepository)

  const users = await listUsersService.execute()

  return {
    statusCode: 200,
    body: JSON.stringify(
        users,
      null, 2
    ),
  };
};
