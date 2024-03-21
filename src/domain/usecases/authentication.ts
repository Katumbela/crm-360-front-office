import { AccountModel } from '../../domain/models'

export interface Authentication {
	handle(params: AuthenticationParams): Promise<AccountModel>
}

export type AuthenticationParams = {
	email: string
	password: string
}
