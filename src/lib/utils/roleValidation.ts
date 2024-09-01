import { Roles } from "../domain/User";

export function roleValidation(role: string): Roles {

    const roles = {
        'read': Roles.READ,
        'write': Roles.WRITE,
        'admin': Roles.ADMIN
    } as any

    if (!Object.keys(roles).includes(role)) {
        throw new Error(`Permissão inválida: ${role}`)
    }
    
    return roles[role]
}