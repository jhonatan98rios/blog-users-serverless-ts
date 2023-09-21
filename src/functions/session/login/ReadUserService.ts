import { IUser } from "../../../lib/domain/User"
import AppError, { ErrorResponse } from "../../../lib/domain/AppError"
import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository"

type ReadUserResponse = {
    user: IUser | null
}

export class ReadUserService {

    constructor(private userRepository: MongoDBUserRepository) {}

    async execute(user: string): Promise<ReadUserResponse | ErrorResponse> {

        const foundUser = await this.userRepository.readOne(user)

        if (!foundUser) {
            return AppError.json('Nenhum usuário encontrado', 404)
        }
        return { user: foundUser }
    }
}