import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/FooterComponent';
import { Header } from './components/HeaderComponent';

export const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
