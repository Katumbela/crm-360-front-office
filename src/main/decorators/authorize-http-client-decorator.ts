import { GetStorage } from '@/data/protocols/cache'
import {
	HttpClient,
	HttpRequestParams,
	HttpResponse,
	HttpStatusCode
} from '@/data/protocols/http'
import { setCurrentAccountAdapter } from '../adapters'

export class AuthorizeHttpClientDecorator implements HttpClient {
	constructor(
		private readonly storage: GetStorage,
		private readonly httpClient: HttpClient
	) {}

	async request(params: HttpRequestParams): Promise<HttpResponse> {
		
			Object.assign(params, {
				headers: Object.assign(params?.headers || {}, {
				
					...params.headers
				})
			})
		
		const { statusCode, ...response } = await this.httpClient.request(params)

		if (statusCode == HttpStatusCode.unauthorized) {
			await setCurrentAccountAdapter(null)
			// const token = await getCurrentAccountAdapter()
		}
		return { ...response, statusCode }
	}
}
