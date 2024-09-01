import { Model, model, Schema } from 'mongoose'
import { IUser } from "../domain/User"

const UserSchema: Schema = new Schema<IUser, Model<IUser>>({
    user: { type: String, required: true, unique: true },
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: false },
    role: { type: String, required: true, unique: false },
    consent: { type: Boolean, required: true, unique: false },
    likedPosts: { type: [String], required: true, unique: false },
})

UserSchema.methods.toJSON = function(){
    let obj = this.toObject()
    delete obj.password
    delete obj.__v
    delete obj._id
    return obj
}

export type IUserModel = Model<IUser>

export class UserModel {
    static getInstance() {
        return model<IUser>('User', UserSchema)
    }
}