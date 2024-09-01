
import { IUser } from "../../../lib/domain/User"
import AppError, { ErrorResponse } from "../../../lib/domain/AppError"
import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository"

type ListUsersResponse = {
    users: IUser[] | null
}

export class ListUsersService {

    constructor(private userRepository: MongoDBUserRepository) {}

    async execute(): Promise<ListUsersResponse | ErrorResponse> {
        const users = await this.userRepository.readAll()
        if (!users) {
            return AppError.json('Nenhum usuário encontrado', 404)
        }
        return { users }
    }
}