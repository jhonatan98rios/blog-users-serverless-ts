import { MongoDBUserTokenRepository } from "../../../lib/infra/MongoDBUserTokenRepository"
import AppError, { ErrorResponse } from "../../../lib/domain/AppError"
import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository"


export class LogoutSessionService {

    constructor(
        private userRepository: MongoDBUserRepository,
        private userTokenRepository: MongoDBUserTokenRepository
    ) {}

    async execute(username: string): Promise<void | ErrorResponse> {
        const userAlreadyExists = await this.userRepository.readOne(username)

        if (!userAlreadyExists) {
            return AppError.json(`O usuário ${username} não foi encontrado`, 404)
        }

        await this.userTokenRepository.delete(username)
    }
}