import { LocalStorageAdapter } from '../../infra/cache'
import { UserModel } from '../../domain/models'

export const setCurrentAccountAdapter = async (account: UserModel | null) => {
	const value = account ? JSON.stringify(account) : ''
	await new LocalStorageAdapter().set('account', value)
}

export const getCurrentAccountAdapter = async (): Promise<UserModel> => {
	const account = await new LocalStorageAdapter().get('account')
	return JSON.parse(account)
}
