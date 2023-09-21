import { addHours, isAfter } from "date-fns";
import AppError, { ErrorResponse } from "../../../lib/domain/AppError"
import { MongoDBUserRepository } from "src/lib/infra/MongoDBUserRepository";
import { MongoDBUserTokenRepository } from "src/lib/infra/MongoDBUserTokenRepository";


type CheckInSessionResponse = {
    user: string,
    token: string,
    role: string
}

export class CheckInSessionService {

    constructor(
        private userRepository: MongoDBUserRepository,
        private userTokenRepository: MongoDBUserTokenRepository
    ) {}

    async execute(token: string): Promise<CheckInSessionResponse | ErrorResponse> {

        const userToken = await this.userTokenRepository.findByToken(token)

        if (!userToken) {
            return AppError.json('Falha ao autenticar o usuário');
        }

        const user = await this.userRepository.readOne(userToken.user)

        if (!user) {
            return AppError.json('Falha ao autenticar o usuário');
        }

        const compare = addHours(userToken.created_at, 2)

        if (isAfter(Date.now(), compare)) {
            return AppError.json('Falha ao autenticar o usuário');
        }

        return {
            user: userToken.user,
            token: userToken.token,
            role: user.role
        }
    }
}