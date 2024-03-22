import { UserModel } from '../../domain/models'

export interface Authentication {
	handle(params: AuthenticationParams): Promise<UserModel>
}

export type AuthenticationParams = {
	email: string
	password: string
}
