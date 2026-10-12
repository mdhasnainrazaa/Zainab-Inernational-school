import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = api.getCurrentUser();
    const token = localStorage.getItem('zips_token');
    if (storedUser && token) {
      setUser(storedUser);
      // Validate token with backend
      api.getMe()
        .then((res) => {
          if (res?.user) {
            setUser(res.user);
            localStorage.setItem('zips_user', JSON.stringify(res.user));
          }
        })
        .catch(() => {
          localStorage.removeItem('zips_token');
          localStorage.removeItem('zips_user');
          setUser(null);
        });
    } else {
      localStorage.removeItem('zips_token');
      localStorage.removeItem('zips_user');
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await api.login(email, password);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
