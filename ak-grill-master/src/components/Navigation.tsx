
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Clock, BookOpen, Settings, Info } from 'lucide-react';

const Navigation: React.FC = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/timers', icon: Clock, label: 'Timers' },
    { to: '/guide', icon: BookOpen, label: 'Guide' },
    { to: '/settings', icon: Settings, label: 'Settings' },
    { to: '/about', icon: Info, label: 'About' },
  ];

  return (
    /* Mobile bottom navigation only */
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
