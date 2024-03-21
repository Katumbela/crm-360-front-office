import { AccountModel } from '../../domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: AccountModel = {
	access_token: undefined,
	dw_cookies: undefined,
	user: undefined
} as any

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		addAuthStore: (state, action: PayloadAction<AccountModel>) => {
			const { access_token, dw_cookies, expires_in, token_type, user } = action.payload
			state.access_token = access_token
			state.user = user
			state.dw_cookies = dw_cookies
			state.expires_in = expires_in
			state.token_type = token_type
		},
		
		removeAuthStore: (state) => {
			state.access_token = undefined as any
			state.user = undefined as any
			state.dw_cookies = undefined as any
			state.expires_in = undefined as any
			state.token_type = undefined as any
		}
	}
})

export const { addAuthStore, removeAuthStore } = authSlice.actions
export const authReducer = authSlice.reducer
