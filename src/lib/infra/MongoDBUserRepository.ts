import * as dotenv from 'dotenv'
import { IUser } from "../domain/User";
import Database from "./Database";
import { IUserModel, UserModel } from "./User.schema";

dotenv.config()

export class MongoDBUserRepository {

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