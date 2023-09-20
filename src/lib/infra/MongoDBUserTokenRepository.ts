import { IUserTokenModel, UserTokenModel } from "./UserToken.schema";
import { IUserToken } from "../domain/UserToken";
import Database from "./Database";
import * as dotenv from 'dotenv'

dotenv.config()

export class MongoDBUserTokenRepository {

    private userTokenModel: IUserTokenModel

    constructor() {
        new Database({
            user: process.env.DATABASE_USER!,
            password: process.env.DATABASE_PASS!,
            collection: process.env.DATABASE_NAME!,
        })

        this.userTokenModel = UserTokenModel.getInstance()
    }

    async findByToken(token: string): Promise<IUserToken | undefined> {
        const userToken = await this.userTokenModel.findOne({ token })
        return userToken as IUserToken
    }

    async create(userToken: IUserToken): Promise<void> {       
        await this.userTokenModel.create(userToken)
    }

    async delete(username: string): Promise<void> {       
        await this.userTokenModel.findOneAndDelete({
            user: username
        })
    }
}