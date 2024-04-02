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
			if (!account.email && !isPublicRoute(path)) {
				location.replace('/')
			} else if (account?.email && path === '/login') {
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

	const isPublicRoute = (path: string) => {
		// Adicione aqui as rotas públicas que não requerem autenticação
		const publicRoutes = ['/login', '/signup', '/']
		return publicRoutes.includes(path)
	}

	if (!auth?.user?.id && !isPublicRoute(path)) return null

	return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}
