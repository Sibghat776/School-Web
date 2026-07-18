import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({ token: null, role: null, user: null });

  // Load stored auth on app start
  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      const parsed = JSON.parse(stored);
      setAuth(parsed);
      api.defaults.headers.common['Authorization'] = `Bearer ${parsed.token}`;
    }
  }, []);

  const login = async (role, credentials) => {
    try {
      const endpointMap = {
        admin: 'auth/admin-login',
        teacher: 'auth/teacher-login',
        student: 'auth/student-login',
      };
      const res = await api.post(endpointMap[role], credentials);
      const body = res.data || {};
      // backend wraps as: { data: { status, message, data: { token } } }
      // dig out the token regardless of nesting depth
      const findToken = (obj) => {
        if (!obj || typeof obj !== 'object') return undefined;
        if (typeof obj.token === 'string') return obj.token;
        if (obj.data && typeof obj.data === 'object') return findToken(obj.data);
        return undefined;
      };
      const token = findToken(body);
      if (!token) throw new Error('No token received from server');
      const newAuth = { token, role };
      setAuth(newAuth);
      localStorage.setItem('auth', JSON.stringify(newAuth));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      toast.success('Logged in successfully');
      const dest = role === 'admin' ? '/admin' : role === 'teacher' ? '/teacher' : '/student';
      navigate(dest, { replace: true });
    } catch (err) {
      console.error('LOGIN ERROR:', err);
      toast.error(err.response?.data?.message || err.message || 'Login failed');
    }
  };

  const logout = () => {
    setAuth({ token: null, role: null, user: null });
    localStorage.removeItem('auth');
    delete api.defaults.headers.common['Authorization'];
    toast.info('Logged out');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
