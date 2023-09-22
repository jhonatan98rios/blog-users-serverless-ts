import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import * as AWSXRay from 'aws-xray-sdk'
import { MongoDBUserTokenRepository } from "../../../lib/infra/MongoDBUserTokenRepository";
import { UpdateUserRoleService } from "./UpdateUserRoleService";

AWSXRay.captureAWS(require('aws-sdk'))

export const updateRoleUser = async (event) => {

  const userRepository = new MongoDBUserRepository()
  const userTokenRepository = new MongoDBUserTokenRepository()
  const updateUserRoleService = new UpdateUserRoleService(userRepository, userTokenRepository)
  const username = event.pathParameters.user
  const { role } = JSON.parse(event.body) 

  const updatedUser = await updateUserRoleService.execute({ username, role })

  return {
    statusCode: 200,
    body: JSON.stringify(
      updatedUser,
      null, 2
    ),
  };
};
