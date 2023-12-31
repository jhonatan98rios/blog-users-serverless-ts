import { CreateUserService } from "./CreateUserService";
import { MongoDBUserRepository } from "./UserRepository";
import * as AWSXRay from 'aws-xray-sdk'

AWSXRay.captureAWS(require('aws-sdk'))

export enum Roles {
  READ = 'read',
  WRITE = 'write',
  ADMIN = 'admin'
}

export const createUser = async (event) => {

  const { user, mail, password, consent } = JSON.parse(event.body) 

  const userRepository = new MongoDBUserRepository()
  const createUserService = new CreateUserService(userRepository)

  const createdUser = await createUserService.execute({
    user, mail, password, consent
  })

  return {
    statusCode: 200,
    body: JSON.stringify(
      createdUser,
      null, 2
    ),
  };
};
