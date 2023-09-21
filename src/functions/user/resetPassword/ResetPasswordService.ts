import { Secret, verify } from 'jsonwebtoken';
import { generateHash } from '../../../lib/infra/hash';
import AppError, { ErrorResponse } from '../../../lib/domain/AppError';
import { Roles, User } from '../../../lib/domain/User';
import { authConfig } from '../../../lib/infra/authConfig';
import { MongoDBUserRepository } from 'src/lib/infra/MongoDBUserRepository';

interface ITokenPayload {
    iat: number
    exp: number
    mail: string
    password: string
}

interface IResetPasswordService {
    mail: string
    token: string
    password: string
    passwordConfirmation: string
}

type ResetPasswordResponse = {
    user: User
}

export class ResetPasswordService {

    constructor(
        private userRepository: MongoDBUserRepository,
    ) {}

    async execute({ 
        mail, token, password, passwordConfirmation 
    }: IResetPasswordService): Promise<ResetPasswordResponse | ErrorResponse> {

        if (password != passwordConfirmation) {
            return AppError.json(`O campo confirmação de senha precisa ser igual ao campo senha`);
        }
        
        const findedUser = await this.userRepository.readOneByMail(mail)

        if (!findedUser) {
            return AppError.json(`O email ${mail} não foi encontrado`, 404)
        }

        try {
            const decodedToken = verify(token, authConfig.jwt.secret as Secret)
            const payload = decodedToken as ITokenPayload

            if (payload.mail != mail) {
                return AppError.json('Falha ao autenticar o usuário');
            }

            if (payload.password != findedUser.password) {
                return AppError.json('Falha ao autenticar o usuário');
            }

            const hashedPassword = await generateHash(password)

            const updatedUser = new User({
                user: findedUser.user,
                mail: findedUser.mail,
                password: hashedPassword,
                role: Roles.READ,
                consent: findedUser.consent,
                likedPosts: findedUser.likedPosts
            })

            this.userRepository.update(findedUser.user, updatedUser)

            return { user: updatedUser }

        } catch {
            return AppError.json('Falha ao autenticar o usuário');
        }
    }
}