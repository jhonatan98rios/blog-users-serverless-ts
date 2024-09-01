import { IUserTokenModel, UserTokenModel } from "./UserToken.schema";
import { IUserToken } from "../domain/UserToken";

export class MongoDBUserTokenRepository {

    private userTokenModel: IUserTokenModel

    constructor() {
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