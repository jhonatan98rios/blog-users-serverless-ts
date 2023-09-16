import { IUser, User } from "./User";

export abstract class AbstractUserRepository {
    abstract create(user: IUser): Promise<IUser>
    abstract readAll(): Promise<IUser[] | null>
    abstract readOne(user: string): Promise<IUser | null>
    abstract readOneByMail(mail: string): Promise<IUser | null> 
    abstract update(username: string, user: User): Promise<User>
}