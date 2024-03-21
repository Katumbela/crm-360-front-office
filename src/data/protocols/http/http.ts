export interface HttpClient<T = any, R = any> {
	request: (params: HttpRequestParams<T>) => Promise<HttpResponse<R>>
}

export type HttpRequestParams<T = any> = {
	url: string
	method: 'post' | 'get' | 'put'
	body?: T
	headers?: object
	params?: object
}

export type HttpResponse<T = any> = {
	statusCode: HttpStatusCode
	body?: T
	headers?: object
}

export enum HttpStatusCode {
	ok = 200,
	okCreated = 201,
	noContent = 204,
	badRequest = 400,
	unauthorized = 401,
	notFound = 404,
	serverError = 500
}

// Original type from api
export type HttpOriginalFieldProps = {
	SystemField: boolean
	FieldName: string
	FieldLabel: string
	IsNull: boolean
	ReadOnly: boolean
	Item: number | string
	ItemElementName: number | string
}

export type HttpOriginalFileProps = {
	FileCabinetId: string
	Fields: HttpOriginalFieldProps[]
}

export type HttpOriginalDocumentsResponse = {
	Count: {
		HasMore: boolean
		ExceedLimit: boolean
		Value: number
	}
	Items: HttpOriginalFileProps[]
}
