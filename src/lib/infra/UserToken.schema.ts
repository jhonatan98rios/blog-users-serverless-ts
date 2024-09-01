import { Model, model, Schema } from 'mongoose'
import { IUserToken } from '../domain/UserToken'

const UserTokenSchema: Schema = new Schema<IUserToken, Model<IUserToken>>({
    token: { type: String, required: true, unique: true },
    user: { type: String, required: true },
    created_at: { type: Date, required: true }
})

export type IUserTokenModel = Model<IUserToken>

export class UserTokenModel {
    static getInstance() {
        return model<IUserToken>('UserToken', UserTokenSchema)
    }
}