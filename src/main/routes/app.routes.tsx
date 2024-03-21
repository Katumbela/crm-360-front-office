import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { MenuUtils } from '../../utils'
import { MakeLogin } from '../factories/pages'
import { NotFound } from '../../presentation/pages'
import Home from '../../presentation/pages/home'

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={MenuUtils.HOME} element={<Home />} />
				<Route path={MenuUtils.LOGIN} element={<MakeLogin/>} />
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}