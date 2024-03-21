import { env } from '../../../main/config'

export const makeApiUrl = (path: string) => `${env.apiUrl}${path}`