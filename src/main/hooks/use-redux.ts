import { RootState } from '../../store'

export const useAuth = () => (state: RootState) => state.auth
