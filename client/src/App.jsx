import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { WorkoutProvider } from './context/WorkoutContext';

import Layout from './components/layout/Layout';
import Home from './pages/Home';
import WorkoutsPage from './pages/WorkoutsPage';
import DietPage from './pages/DietPage';
import HealthTipsPage from './pages/HealthTipsPage';
import ProfilePage from './pages/ProfilePage';
import PlannerPage from './pages/PlannerPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <WorkoutProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1e293b',
                color: '#f8fafc',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                borderRadius: '16px',
                fontSize: '13px',
                fontWeight: '600',
              },
              success: {
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#0f172a',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#0f172a',
                },
              },
            }}
          />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="workouts" element={<WorkoutsPage />} />
              <Route path="workouts/:muscleGroup" element={<WorkoutsPage />} />
              <Route path="diet" element={<DietPage />} />
              <Route path="health-tips" element={<HealthTipsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="planner" element={<PlannerPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
          </Routes>
        </WorkoutProvider>
      </AuthProvider>
    </Router>
  );
}
