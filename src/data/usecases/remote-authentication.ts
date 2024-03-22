// import { Authentication, AuthenticationParams } from '@/domain/usecases'
// import { HttpClient, HttpStatusCode } from '../protocols/http'
// import { InvalidCredentialsError, UnexpectedError } from '../../domain/errors'
// import { AccountModel } from '@/domain/models'

// export class RemoteAuthentication implements Authentication {
// 	constructor(
// 		private readonly url: string,
// 		private readonly httpClient: HttpClient<AuthenticationParams, AccountModel>
// 	) {}
// 	async handle(params: AuthenticationParams): Promise<AccountModel> {
// 		const httpResponse = await this.httpClient.request({
// 			url: this.url,
// 			method: 'post',
// 			body: params
// 		})
// 		switch (httpResponse.statusCode) {
// 			case HttpStatusCode.ok:
// 				return httpResponse.body as AccountModel
// 			case HttpStatusCode.unauthorized:
// 				throw new InvalidCredentialsError()
// 			default:
// 				throw new UnexpectedError((httpResponse.body as any)?.message)
// 		}
// 	}
// }
