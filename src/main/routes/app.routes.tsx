import { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserModel } from '../../domain/models';
import authService from '../../services/auth.service';
import axios from 'axios';
import { env } from '../../main/config';
import { addAuthStore } from '../../store';
import { Dashboard, EmailCampaign, NotFound, Signup } from '../../presentation/pages';
import Home from '../../presentation/pages/home';
import { MakeLogin } from '../factories/pages';
import { MenuUtils } from '../../utils';
import { useAuth } from '../hooks';
import { SignupSuccess } from '../../presentation/components/signup-success';
import { DashMonitoring } from '../../presentation/pages/Dashboard-monitoring';

export function AppRoutes() {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(useAuth());

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

	// Efeito colateral para iniciar a atualização periódica dos dados do usuário
	useEffect(() => {
		const userLocal = authService.getCurrentUserId();

		// Função para atualizar os dados do usuário periodicamente
		async function updateUserDataPeriodically(userId: string) {
			try {
				const latestUserData = await fetchUserById(userId);
				dispatch(addAuthStore(latestUserData));
			} catch (error) {
				console.error('faca login')
				// console.error("Erro ao atualizar os dados do usuário:", error);
			}
		}

		// const intervalId = setInterval(() => {
		updateUserDataPeriodically(userLocal);
		// }, 5000); // Executar a atualização a cada 5 segundos

		// Limpar o intervalo quando o componente é desmontado
		// return () => clearInterval(intervalId);
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MakeLogin />} path={'/login'} />
				<Route path={'/signup'} element={<Signup />} />
				<Route path={'/success'} element={<SignupSuccess />} /> {/* Movido para fora do bloco condicional */}
				{isAuthenticated.user?.name != null ? (
					<>

						<Route path={'/'} element={<Dashboard />} />
						<Route path={'/internet/monitoring'} element={<DashMonitoring />} />
						<Route path={'/dashboard/email'} element={<EmailCampaign />} />
					</>
				) : (
					<Route path={MenuUtils.HOME} element={<Home />} />
				)}


				<Route path="/*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
