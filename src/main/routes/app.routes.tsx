import { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserModel } from '../../domain/models';
import authService from '../../services/auth.service';
import axios from 'axios';
import { env } from '../../main/config';
import { addAuthStore } from '../../store';
import { Dashboard, NotFound, Signup } from '../../presentation/pages';
import Home from '../../presentation/pages/home';
import { MakeLogin } from '../factories/pages';
import { MenuUtils } from '../../utils';
import { useAuth } from '../hooks';
import { useSelector } from 'react-redux';
import { SignupSuccess } from '../../presentation/components/signup-success';

export function AppRoutes() {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(useAuth())
	// Função para buscar os dados do usuário na API pelo ID
	async function fetchUserById(id: string): Promise<UserModel> {
		const response = await axios.get(`${env.apiUrl}/user/${id}`);
		if (response.status === 200) {
			return response.data;
		} else {
			console.log(id)
			throw new Error("Erro ao buscar os dados do usuário na API");
		}
	}

	// Função para atualizar os dados do usuário periodicamente
	async function updateUserDataPeriodically(userId: string) {
		try {
			const latestUserData = await fetchUserById(userId);
			// Atualizar os dados do usuário no localStorage e no store
			//   storeUserDataInLocalStorage(latestUserData?.id);
			dispatch(addAuthStore(latestUserData));
		} catch (error) {
			console.error("Erro ao atualizar os dados do usuário:", error);
		}
	}

	// Efeito colateral para iniciar a atualização periódica dos dados do usuário
	useEffect(() => {
		const userLocal = authService.getCurrentUserId();
		const intervalId = setInterval(() => {
			// console.log(userLocal)
			updateUserDataPeriodically(userLocal);
		}, 1000); // Executar a atualização a cada 5 segundos

		// Limpar o intervalo quando o componente é desmontado
		return () => clearInterval(intervalId);
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path={'/login'} element={<MakeLogin />} />
				<Route path={'/signup'} element={<Signup />} />
				<Route path={'/success'} element={<SignupSuccess />} /> {/* Movido para fora do bloco condicional */}
				{isAuthenticated.user?.name != null ? (
					<>
						<Route path={'/'} element={<Dashboard />} />
						{/* Adicione outras rotas protegidas aqui */}
					</>
				) : (
					<>
						<Route path={MenuUtils.HOME} element={<Home />} />
					</>
				)}
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>

	);
}
