
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pb-20 md:pb-4">
        {children}
      </main>
      <Navigation />
    </div>
  );
};

export default Layout;
