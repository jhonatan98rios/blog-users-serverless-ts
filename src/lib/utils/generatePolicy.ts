type authResponse = {
  principalId: string
  policyDocument: {
    Version?: string
    Statement?: [
      {
        Action?: string,
        Effect?: string,
        Resource?: string
      }
    ]
  }
}

// Policy helper function
export const generatePolicy = (principalId, effect, resource) => {

  const authResponse: authResponse = {
    principalId: principalId,
    policyDocument: {
      Version: '2012-10-17'
    }
  }

  if (effect && resource) {
    authResponse.policyDocument.Statement = [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource
      }
    ]
  }

  return authResponse
}