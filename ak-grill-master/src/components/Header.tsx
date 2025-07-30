
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Flame, Home, Clock, BookOpen, Settings, Info } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/timers', icon: Clock, label: 'Timers' },
    { to: '/guide', icon: BookOpen, label: 'Guide' },
    { to: '/settings', icon: Settings, label: 'Settings' },
    { to: '/about', icon: Info, label: 'About' },
  ];

  return (
    <header className="grill-gradient text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo on left */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity group">
          <Flame className="h-8 w-8 group-hover:scale-110 transition-transform" />
          <h1 className="text-2xl font-brand bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent group-hover:from-yellow-100 group-hover:to-white group-hover:scale-105 transition-all duration-300 drop-shadow-sm">AK Grill Timer</h1>
        </Link>
        
        {/* Navigation items and theme toggle on right for desktop */}
        <div className="hidden md:flex items-center gap-4">
          <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-white bg-white/20' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
