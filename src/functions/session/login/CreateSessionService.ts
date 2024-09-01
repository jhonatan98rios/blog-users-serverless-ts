import { sign, Secret } from 'jsonwebtoken';
import { UserToken } from '../../../lib/domain/UserToken';
import { MongoDBUserRepository } from '../../../lib/infra/MongoDBUserRepository';
import { MongoDBUserTokenRepository } from '../../../lib/infra/MongoDBUserTokenRepository';
import AppError, { ErrorResponse } from '../../../lib/domain/AppError';
import { authConfig } from '../../../lib/infra/authConfig';
import { compareHash } from '../../../lib/infra/hash';

type CreateSessionResponse = {
    user: string,
    token: string,
    role: string,
}

export class CreateSessionService {

    constructor(
        private userRepository: MongoDBUserRepository,
        private userTokenRepository: MongoDBUserTokenRepository
    ) {}

    async execute({ user, password }): Promise<CreateSessionResponse | ErrorResponse> {

        const foundUser = await this.userRepository.readOne(user)

        if (!foundUser) {
            return AppError.json('Usuário! ou senha incorretos', 401);
        }

        const passwordConfirmed = await compareHash(
            password, 
            foundUser.password
        )

        console.log(password)
        console.log(foundUser.password)

        if (!passwordConfirmed) {
            return AppError.json('Usuário ou senha! incorretos', 401);
        }

        const payload = {
            role: foundUser.role,
        }

        const options = {
            subject: user,
            expiresIn: authConfig.jwt.expiresIn
        }

        const token = sign(payload, authConfig.jwt.secret as Secret, options)
        
        const userToken = new UserToken({
            token, user
        })
        
        await this.userTokenRepository.create(userToken.props) 
       
        return {
            user: userToken.user,
            token: token,
            role: foundUser.role
        }
    }
}