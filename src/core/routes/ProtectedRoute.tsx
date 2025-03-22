import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import LoadingFallback from '@/components/loader/LoadingFallback';
import { UserRole } from '@/features/auth/types/auth.types';
import { RootState } from '@/store';
import { ROUTES } from './constants';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  roles: string[];
  permission?: string;
}

const selectAuth = (state: RootState) => state.auth;

const selectAuthState = createSelector(
  selectAuth,
  (auth) => ({
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading || false
  })
);

// List of paths that are publicly accessible and don't require authentication
const publicPaths = [
  ROUTES.AUTH.LOGIN,
  ROUTES.AUTH.FORGET_PASSWORD,
  ROUTES.AUTH.SEND_PASSWORD_RESET,
  ROUTES.AUTH.RESET_LINK_CONFIRMATION,
  ROUTES.AUTH.RESET_PASSWORD
];

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = [],
  roles
}) => {
  const { user, isAuthenticated, isLoading } = useSelector(selectAuthState);
  const location = useLocation();
  
  // Check if the current path is public
  const isPublicPath = publicPaths.some(path => {
    // Handle paths with parameters (like reset-password with token)
    if (path.includes(':')) {
      const pathPattern = path.split(':')[0]; // Get the base path
      return location.pathname.startsWith(pathPattern);
    }
    return location.pathname === path || (
      // Special case for reset-password which has a query parameter
      path === ROUTES.AUTH.RESET_PASSWORD && 
      location.pathname === ROUTES.AUTH.RESET_PASSWORD
    );
  });

  // Check if it's a wildcard role (public route)
  const isWildcardRole = roles.includes("*");

  // If it's a public route or has a wildcard role, allow access without authentication
  if (isPublicPath || isWildcardRole) {
    return <>{children}</>;
  }

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const hasRequiredRole = allowedRoles.length === 0 || 
    (user.role && allowedRoles.includes(user.role.name));

  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
