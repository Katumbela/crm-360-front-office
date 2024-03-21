import axios, { AxiosResponse } from 'axios'
import {
	HttpClient,
	HttpRequestParams,
	HttpResponse,
	HttpStatusCode
} from '../../data/protocols/http'

export class AxiosHttpClient implements HttpClient {
	async request(params: HttpRequestParams<any>): Promise<HttpResponse<any>> {
		let httpResponse: AxiosResponse
		try {
			httpResponse = await axios.request({
				url: params.url,
				method: params.method,
				data: params.body,
				headers: params?.headers,
				params: params?.params
			})
		} catch (error: any) {
			httpResponse = error.response ?? {
				data: error,
				status: HttpStatusCode.serverError
			}
		}
		return {
			...httpResponse,
			body: httpResponse.data,
			statusCode: httpResponse.status
		}
	}
}
