import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const stored = localStorage.getItem('auth');
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

export const ProtectedRoute = ({ roles }) => {
  const auth = useAuth();
  if (!auth || !auth.token) return <Navigate to="/" replace />;
  if (roles && !roles.includes(auth.role)) {
    // redirect to the role's own home
    const home = auth.role === 'admin' ? '/admin' : auth.role === 'teacher' ? '/teacher' : '/student';
    return <Navigate to={home} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
