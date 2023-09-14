import { DocumentClient } from "aws-sdk/clients/dynamodb";
import {v4 as uuid} from 'uuid';

const tableName = "BlogUsersTable"
const docClient = new DocumentClient()

export enum Roles {
  READ = 'read',
  WRITE = 'write',
  ADMIN = 'admin'
}

async function create(user) {
  await docClient.put({
    TableName: tableName,
    Item: user,
  })
  .promise();

  return user;
}

export const createUser = async (event) => {

  const { user, mail, password, consent } = JSON.parse(event.body) 
  const createdUser = { user, mail, password, consent, role: Roles.READ, likedPosts: [], id: uuid() }

  create(createdUser)

  return {
    statusCode: 200,
    body: JSON.stringify(
      createdUser,
      null, 2
    ),
  };
};
