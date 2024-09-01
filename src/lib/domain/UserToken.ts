export interface IUserToken {
    token: string;
    user: string;
    created_at: Date;
}

type CheckInProps = {
    created_at?: Date | undefined;
    user: string;
    token: string;
}

export class UserToken {

    props: IUserToken

    constructor(props: CheckInProps) {
        this.props = {
            ...props,
            created_at: new Date()
        }
    }

    get token(): string {
        return this.props.token
    }

    get user(): string {
        return this.props.user
    }

    get created_at(): Date {
        return this.props.created_at
    }
}