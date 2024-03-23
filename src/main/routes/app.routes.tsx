import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { MenuUtils } from '../../utils'
import { MakeLogin } from '../factories/pages'
import { NotFound } from '../../presentation/pages'
import Home from '../../presentation/pages/home'
import authService from '../../services/auth.service'
import { useEffect } from 'react'
import { storeUserDataInLocalStorage } from '../../domain/usecases'
import { UserModel } from '../../domain/models'
import { useDispatch } from 'react-redux'
import { env } from '../../main/config'
import axios from 'axios'
import { addAuthStore } from '../../store'


export function AppRoutes() {

	const dispatch = useDispatch()

	// Função para buscar o usuário pelo ID na API
	async function fetchUserById(id: string): Promise<UserModel> {
		const response = await axios.get(`${env.apiUrl}/user/${id}`); // Substitua "/user" pelo endpoint correto para obter os dados do usuário
		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error("Erro ao buscar os dados do usuário na API");
		}
	}

	// Função para atualizar os dados armazenados no localStorage e no store
	async function updateUserData(user: UserModel) {
		// Atualizar o localStorage
		storeUserDataInLocalStorage(user);

		// Atualizar o store, se necessário
		dispatch(addAuthStore(user));
	}

	// Função para atualizar periodicamente os dados do usuário
	async function updateUserDataPeriodically(userId: string) {

		try {
			const latestUserData = await fetchUserById(userId);
			updateUserData(latestUserData);
		} catch (error) {
			console.error("Erro ao atualizar os dados do usuário:", error);
		}
		// Atualize a cada 5 segundos (5000 milissegundos)
	}


	useEffect(() => {
		const userLocal = authService.getCurrentUserId()
		console.log(userLocal)
		updateUserDataPeriodically(userLocal)
	}, [])
	return (
		<BrowserRouter>
			<Routes>
				<Route path={MenuUtils.HOME} element={<Home />} />
				<Route path={MenuUtils.LOGIN} element={<MakeLogin />} />
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}