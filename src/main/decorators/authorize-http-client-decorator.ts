import { GetStorage } from '@/data/protocols/cache'
import {
	HttpClient,
	HttpRequestParams,
	HttpResponse,
	HttpStatusCode
} from '@/data/protocols/http'
import { AccountModel } from '@/domain/models'
import { setCurrentAccountAdapter } from '../adapters'

export class AuthorizeHttpClientDecorator implements HttpClient {
	constructor(
		private readonly storage: GetStorage,
		private readonly httpClient: HttpClient
	) {}

	async request(params: HttpRequestParams): Promise<HttpResponse> {
		const accountStorage = await this.storage.get('account')
		const account: AccountModel = accountStorage ? JSON.parse(accountStorage) : null
		if (account?.access_token) {
			Object.assign(params, {
				headers: Object.assign(params?.headers || {}, {
					Authorization: `bearer ${account.access_token}`,
					Cookie: account?.dw_cookies,
					...params.headers
				})
			})
		}
		const { statusCode, ...response } = await this.httpClient.request(params)

		if (statusCode == HttpStatusCode.unauthorized) {
			await setCurrentAccountAdapter(null)
			// const token = await getCurrentAccountAdapter()
		}
		return { ...response, statusCode }
	}
}
