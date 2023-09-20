



import AppError, { ErrorResponse } from "../../../lib/domain/AppError";
import { User } from "../../../lib/domain/User";
import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import { compareHash, generateHash } from "../../../lib/infra/hash";

type UpdateUserResponse = {
    user: User
}

export type UpdateUserDto = {
    username: string
    currentPassword: string
    password: string
    passwordConfirmation: string
}

export class UpdateUserService {
    constructor(private userRepository: MongoDBUserRepository) {}

    async execute({
        username, currentPassword, password, passwordConfirmation
    }: UpdateUserDto): Promise<UpdateUserResponse | ErrorResponse> {

        if (password != passwordConfirmation) {
            return AppError.json(`O campo "confirmação de senha" precisa ser igual ao campo senha`);
        }

        const findedUser = await this.userRepository.readOne(username)

        if (!findedUser) {
            return AppError.json(`O usuário ${username} não foi encontrado`, 404)
        }

        const currentPasswordConfirmed = await compareHash(
            currentPassword, 
            findedUser.password
        )

        if (!currentPasswordConfirmed) {
            return AppError.json('A senha atual informada é invalida', 401);
        }

        const hashedPassword = await generateHash(password)

        const updatedUser = new User({
            user: username,
            mail: findedUser.mail,
            password: hashedPassword,
            role: findedUser.role,
            consent: findedUser.consent,
            likedPosts: findedUser.likedPosts
        })

        await this.userRepository.update(username, updatedUser)
        return { user: updatedUser }
    }
}