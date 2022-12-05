import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PRProps extends React.PropsWithChildren {
  isAllowed: boolean;
  redirectPath: string;
}

export const ProtectedRoute: React.FC<PRProps> = ({ isAllowed, redirectPath, children }) => {
  if (!isAllowed) return <Navigate to={redirectPath} />;

  return <React.Fragment>{children ? children : <Outlet />}</React.Fragment>;
};
