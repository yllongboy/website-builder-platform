/**
 * ⚠️ ROUTING RULES:
 * - Router is in main.tsx. Do NOT add another <BrowserRouter> here or anywhere.
 * - Use <Routes> + <Route> components ONLY. Do NOT use useRoutes().
 * - STATIC IMPORTS ONLY — no React.lazy() or dynamic import().
 * - Import from 'react-router' — NOT 'react-router-dom' (does not exist).
 */
import { Routes, Route } from 'react-router';
import Landing from '@/pages/Landing';
import GetStarted from '@/pages/GetStarted';
import Dashboard from '@/pages/Dashboard';
import Templates from '@/pages/Templates';
import MyWebsites from '@/pages/MyWebsites';
import Editor from '@/pages/Editor';
import Preview from '@/pages/Preview';
import Billing from '@/pages/Billing';
import Settings from '@/pages/Settings';
import Help from '@/pages/Help';
import { NotFound } from '@/components/states/NotFound';

export default function App() {
	return (
		<Routes>
			{/* Public routes */}
			<Route path="/landing" element={<Landing />} />
			<Route path="/get-started" element={<GetStarted />} />
			
			{/* Authenticated routes (dashboard) */}
			<Route path="/" element={<Dashboard />} />
			<Route path="/templates" element={<Templates />} />
			<Route path="/websites" element={<MyWebsites />} />
			<Route path="/editor/:id" element={<Editor />} />
			<Route path="/preview/:id" element={<Preview />} />
			<Route path="/billing" element={<Billing />} />
			<Route path="/settings" element={<Settings />} />
			<Route path="/help" element={<Help />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
