import { LocalStorageAdapter } from '../../infra/cache'
import { AccountModel } from '../../domain/models'

export const setCurrentAccountAdapter = async (account: AccountModel | null) => {
	const value = account ? JSON.stringify(account) : ''
	await new LocalStorageAdapter().set('account', value)
}

export const getCurrentAccountAdapter = async (): Promise<AccountModel> => {
	const account = await new LocalStorageAdapter().get('account')
	return JSON.parse(account)
}
