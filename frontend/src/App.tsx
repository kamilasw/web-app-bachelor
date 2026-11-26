import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout/AppLayout';
import { Home } from './pages/Home/Home';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AppLayout />}>
					<Route index element={<Home />} />
					<Route path="segmentation" element={<h1>Segmentation</h1>} />
					<Route path="dashboards" element={<h1>Dashboards</h1>} />
					<Route path="widgets" element={<h1>Widgets</h1>} />
					<Route path="assistant" element={<h1>AI Assistant</h1>} />
					<Route path="settings" element={<h1>Settings</h1>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
