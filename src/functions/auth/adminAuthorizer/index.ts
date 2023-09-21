import { verify, Secret } from 'jsonwebtoken'
import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda';

import AppError from "../../../lib/domain/AppError"
import { Roles } from '../../../lib/domain/User';
import { generatePolicy } from '../../../lib/utils/generatePolicy';
import { authConfig } from '../../../lib/infra/authConfig';


interface ITokenPayload {
  iat: number
  exp: number
  sub: string
  role: string
}

export const adminAuthorizer = async (event: APIGatewayTokenAuthorizerEvent) => {

  console.log("event:", event.authorizationToken)

  if (!event.authorizationToken) {
    return AppError.json('Falha ao autenticar o usuário');
  }

  const [, token] = event.authorizationToken.split(' ');
 
  try {
    const decoded = verify(token, authConfig.jwt.secret as Secret);
    const { sub, role } = decoded as ITokenPayload

    if (role !== Roles.ADMIN) {
      return AppError.json('Falha ao autenticar o usuário');
    }

    console.log('valid from customAuthorizer', decoded);
    return generatePolicy(sub, 'Allow', event.methodArn)

  } catch (err) {
    return AppError.json('Falha ao autenticar o usuário');
  }
}
