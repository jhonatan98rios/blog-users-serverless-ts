import { roleValidation } from "../../../lib/utils/roleValidation";
import AppError, { ErrorResponse } from "../../../lib/domain/AppError";
import {  User } from "../../../lib/domain/User";

import { MongoDBUserRepository } from "../../../lib/infra/MongoDBUserRepository";
import { MongoDBUserTokenRepository } from "../../../lib/infra/MongoDBUserTokenRepository";

type UpdateUserRoleReponse = {
    user: User
}

export type UpdateUserRoleDto = {
    username: string
    role: string
}

export class UpdateUserRoleService {
    constructor(
        private userRepository: MongoDBUserRepository,
        private userTokenRepository: MongoDBUserTokenRepository
    ) {}

    async execute({
        username, role
    }: UpdateUserRoleDto): Promise<UpdateUserRoleReponse | ErrorResponse> {

        const userAlreadyExists = await this.userRepository.readOne(username)

        if (!userAlreadyExists) {
            return AppError.json(`O usuário ${username} não foi encontrado`, 404)
        }

        const updatedUser = new User({
            role: roleValidation(role),
            user: username,
            mail: userAlreadyExists.mail,
            password: userAlreadyExists.password,
            consent: userAlreadyExists.consent,
            likedPosts: userAlreadyExists.likedPosts,
        })

        await this.userRepository.update(username, updatedUser)
        await this.userTokenRepository.delete(username)

        return { user: updatedUser }
    }
}