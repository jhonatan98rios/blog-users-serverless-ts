import { IUser, Roles, User } from "./User"
import AppError, { ErrorResponse } from "./AppError"
import { generateHash } from "./hash"
import { AbstractUserRepository } from "./AbstractUserRepository";

type CreateUserResponse = {
    user: User
}

export class CreateUserService {
    constructor(private userRepository: AbstractUserRepository) {}

    async execute({ user, mail, password, consent }: Partial<IUser>): Promise<CreateUserResponse | ErrorResponse> {

        const userAlreadyExists = await this.userRepository.readOne(user!)

        if (userAlreadyExists) {
            return AppError.json('Esse nome de usuário já esta sendo utilizado por outro usuário', 409)
        }

        const mailAlreadyExists = await this.userRepository.readOneByMail(mail!)

        if (mailAlreadyExists) {
            return AppError.json('Esse e-mail já esta sendo utilizado por outro usuário', 409)
        }

        const hashedPassword = await generateHash(password!)

        const createdUser = new User({
            user: user!,
            mail: mail!,
            role: Roles.READ,
            password: hashedPassword,
            consent: consent!,
            likedPosts: []
        })

        await this.userRepository.create(createdUser)
        return { user: createdUser }
    }
}