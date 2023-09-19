import { IUser, Roles, User } from "../../../lib/domain/User"
import AppError, { ErrorResponse } from "../../../lib/domain/AppError"
import { generateHash } from "../../../lib/infra/hash"
import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";

type CreateUserResponse = {
    user: User
}

export class CreateUserService {
    constructor(private userRepository: MongoDBUserRepository) {}

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