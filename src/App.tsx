import './presentation/theme/global.css'
import './index.css'
import { AppRoutes } from './main/routes'
import { store } from './store'
import { Provider} from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { AppProvider } from './presentation/contexts'

function App() {

	return (
		<div  className="bg-gradient-radial">
			<Provider store={store}>
				<Toaster position="top-center" toastOptions={{ duration: 6000 }} />
				<AppProvider>
					<AppRoutes />
				</AppProvider>
			</Provider>
		</div>
	)
}

export default App
