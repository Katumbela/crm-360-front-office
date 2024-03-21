import { ReactNode, createContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentAccountAdapter } from '../../main/adapters'
import { useAuth } from '../../main/hooks'
import { addAuthStore } from '../../store'

const AuthContext = createContext({})

type AuthProviderProps = {
	children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const auth = useSelector(useAuth())
	const path = location.pathname
	const dispatch = useDispatch()

	useEffect(() => {
		const load = async () => {
			const account = await getCurrentAccountAdapter()
			if (!account?.user && path.indexOf('/login') < 0) {
				location.replace('/login')
			} else if (account?.user && path.indexOf('/login') >= 0) {
				location.replace('/')
			} else {
				if (!auth?.user?.id) dispatch(addAuthStore(account))
			}
		}
		const id = setInterval(() => {
			load()
		}, 300)

		return () => {
			clearInterval(id)
		}
	}, [auth?.user?.id, dispatch, path])

	if (!auth?.user?.id && path.indexOf('/login') < 0) return <></>

	return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}
