import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import Dashboard from '../pages/Dashboard';
import ScanPage from '../pages/ScanPage';
import FakeNewsChecker from '../pages/FakeNewsChecker';
import CarbonVerifier from '../pages/CarbonVerifier';
import ScanHistory from '../pages/ScanHistory';
import Settings from '../pages/Settings';
import About from '../pages/About';
import Contact from '../pages/Contact';
import AdminPanel from '../pages/AdminPanel';
import DashboardLayout from '../layouts/DashboardLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'scan',
        element: <ScanPage />,
      },
      {
        path: 'fact-check',
        element: <FakeNewsChecker />,
      },
      {
        path: 'carbon-verify',
        element: <CarbonVerifier />,
      },
      {
        path: 'history',
        element: <ScanHistory />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/admin',
    element: <AdminPanel />,
  },
]);
