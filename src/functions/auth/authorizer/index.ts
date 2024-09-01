import { verify, Secret } from 'jsonwebtoken'
import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda';

import AppError from "../../../lib/domain/AppError"
import { generatePolicy } from '../../../lib/utils/generatePolicy';
import { authConfig } from '../../../lib/infra/authConfig';

export const authorizer = async (event: APIGatewayTokenAuthorizerEvent) => {
  if (!event.authorizationToken) {
    return AppError.json('Falha ao autenticar o usuário');
  }

  const [, token] = event.authorizationToken.split(' ');
 
  try {
    const decoded = verify(token, authConfig.jwt.secret as Secret);
    console.log('valid from customAuthorizer', decoded);
    return generatePolicy(decoded.sub, 'Allow', event.methodArn)

  } catch (err) {
    return AppError.json('Falha ao autenticar o usuário');
  }
}
