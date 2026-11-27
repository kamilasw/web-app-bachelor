import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout/AppLayout';
import { Home } from './pages/Home/Home';
import { AuthLayout } from './components/layout/AuthLayout/AuthLayout';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Settings } from './pages/Settings/Settings';
import { Segmentation } from './pages/Segmentation/Segmentation';
import { Widgets } from './pages/Widgets/Widgets';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AuthLayout />}>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>
				<Route element={<AppLayout />}>
					<Route index element={<Home />} />
					<Route path="segmentation" element={<Segmentation />} />
					<Route path="dashboards" element={<h1>Dashboards</h1>} />
					<Route path="widgets" element={<Widgets />} />
					<Route path="assistant" element={<h1>AI Assistant</h1>} />
					<Route path="settings" element={<Settings />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
