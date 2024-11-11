import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './features/auth/pages/LoginPage';
import { SignupPage } from './features/auth/pages/SignupPage';
import { Dashboard } from './features/dashboard/pages/Dashboard';
import { ContactsPage } from './features/contacts/pages/ContactsPage';
import { CompaniesPage } from './features/companies/pages/CompaniesPage';
import { DealsPage } from './features/deals/pages/DealsPage';
import { TasksPage } from './features/tasks/pages/TasksPage';
import { TemplatesPage } from './features/crm/templates/pages/TemplatesPage';
import { AnalyticsPage } from './features/analytics/pages/AnalyticsPage';
import { PreferencesPage } from './features/settings/pages/PreferencesPage';
import { ProtectedRoute } from './components/ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/contacts" element={
        <ProtectedRoute>
          <ContactsPage />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/companies" element={
        <ProtectedRoute>
          <CompaniesPage />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/deals" element={
        <ProtectedRoute>
          <DealsPage />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/tasks" element={
        <ProtectedRoute>
          <TasksPage />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/templates" element={
        <ProtectedRoute>
          <TemplatesPage />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/analytics" element={
        <ProtectedRoute>
          <AnalyticsPage />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/preferences" element={
        <ProtectedRoute>
          <PreferencesPage />
        </ProtectedRoute>
      } />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}