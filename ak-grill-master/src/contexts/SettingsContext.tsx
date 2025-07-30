
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Settings {
  temperatureUnit: 'C' | 'F';
  notificationsEnabled: boolean;
  favoritePresets: string[];
  soundEnabled: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  convertTemperature: (temp: number, fromUnit?: 'C' | 'F') => number;
}

const defaultSettings: Settings = {
  temperatureUnit: 'F',
  notificationsEnabled: true,
  favoritePresets: [],
  soundEnabled: true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    const savedSettings = localStorage.getItem('akGrillSettings');
    if (savedSettings) {
      setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
    }
  }, []);

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('akGrillSettings', JSON.stringify(updatedSettings));
  };

  const convertTemperature = (temp: number, fromUnit: 'C' | 'F' = 'F'): number => {
    if (settings.temperatureUnit === fromUnit) return temp;
    
    if (fromUnit === 'F' && settings.temperatureUnit === 'C') {
      return Math.round((temp - 32) * 5 / 9);
    } else {
      return Math.round((temp * 9 / 5) + 32);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, convertTemperature }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
