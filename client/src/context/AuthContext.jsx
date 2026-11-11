import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('apexfit_token'));
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem('apexfit_token');
      if (!storedToken) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${API_BASE}/api/users/me`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setUser(res.data.user || res.data);
        setToken(storedToken);
      } catch {
        localStorage.removeItem('apexfit_token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await axios.post(`${API_BASE}/api/users/login`, { email, password });
    const { token: newToken, user: userData } = res.data;
    localStorage.setItem('apexfit_token', newToken);
    setToken(newToken);
    setUser(userData);
    return userData;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const res = await axios.post(`${API_BASE}/api/users/register`, { name, email, password });
    const { token: newToken, user: userData } = res.data;
    localStorage.setItem('apexfit_token', newToken);
    setToken(newToken);
    setUser(userData);
    return userData;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('apexfit_token');
    setToken(null);
    setUser(null);
  }, []);

  const updateUser = useCallback((updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
