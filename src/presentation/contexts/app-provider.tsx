import { ReactNode } from 'react'
import { AuthProvider } from '.'

type AppProviderProps = {
	children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
	return <AuthProvider>{children}</AuthProvider>
}
