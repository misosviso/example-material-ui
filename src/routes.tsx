import { Navigate } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import MainLayout from './layouts/MainLayout'
import AccountView from './views/account/AccountView'
import DashboardView from './views/reports/DashboardView'
import LoginView from './views/auth/LoginView'
import NotFoundView from './views/errors/NotFoundView'
import ProductListView from './views/product/ProductListView'
import RegisterView from './views/auth/RegisterView'
import SettingsView from './views/settings/SettingsView'
import {
  generatePagesRoutes,
} from '@iteria-app/component-templates/src/material-ui'
import * as generatedGraphql from './generated/graphql'

const routing = generatePagesRoutes(generatedGraphql)  

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> },
      ...routing
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> },
    ]
  }
];

export default routes;
