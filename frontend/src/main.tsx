import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { APP_NAME } from './constants/app.ts';

import { AllCommunityModule, ModuleRegistry } from 'ag-charts-community';

ModuleRegistry.registerModules([AllCommunityModule]);

document.title = APP_NAME;

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
