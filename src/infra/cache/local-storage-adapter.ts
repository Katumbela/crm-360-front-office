import { GetStorage, SetStorage } from '@/data/protocols/cache'
export class LocalStorageAdapter implements SetStorage, GetStorage {
	async set(key: string, value: string): Promise<void> {
		if (value) {
			localStorage.setItem(key, value)
		} else {
			localStorage.removeItem(key)
		}
	}

	async get(key: string): Promise<string> {
		return localStorage.getItem(key) as string
	}
}
