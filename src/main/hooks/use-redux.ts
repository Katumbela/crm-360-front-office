import { RootState } from '../../store'

export const useAuth = () => (state: RootState) => state.auth
export const useProcessLoader = () => (state: RootState) => state.util.showUtil
