export enum Roles {
    READ = 'read',
    WRITE = 'write',
    ADMIN = 'admin'
}

export interface IUser {
    user: string
    mail: string
    password: string
    role: Roles
    consent: boolean
    likedPosts: string[]
}

export class User {
    user: string
    mail: string
    password: string
    role: Roles
    consent: boolean
    likedPosts: string[]

    constructor({ user, mail, password, role, consent, likedPosts }: IUser) {
        this.user = user
        this.mail = mail
        this.password = password
        this.role = role
        this.consent = consent
        this.likedPosts = likedPosts
    }
}