import { IUser } from "./User";
import { AbstractUserRepository } from "./AbstractUserRepository";
import { IUserModel, UserModel } from "./User.schema";
import * as dotenv from 'dotenv'
import Database from "./Database";

dotenv.config()

export class MongoDBUserRepository implements AbstractUserRepository {

    private userModel: IUserModel

    constructor() {
        new Database({
            user: process.env.DATABASE_USER!,
            password: process.env.DATABASE_PASS!,
            collection: process.env.DATABASE_NAME!,
        })

        this.userModel = UserModel.getInstance()
    }

    async create(user: IUser): Promise<IUser> {
        await this.userModel.create(user)
        return user
    }

    async readAll(): Promise<IUser[] | null> {
        const users = await this.userModel.find()
        return users
    }

    async readOne(user: string): Promise<IUser | null> {
        const findedUser = await this.userModel.findOne({ user })
        return findedUser
    }

    async readOneByMail(mail: string): Promise<IUser | null> {
        const findedUser = await this.userModel.findOne({ mail })
        return findedUser
    }

    async update(username: string, user: IUser): Promise<IUser> {
        await this.userModel.findOneAndUpdate({ user: username }, user)
        return user
    }
}