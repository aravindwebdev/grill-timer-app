import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Settings as SettingsIcon, Thermometer, Bell, Trash2, Download, Heart } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { useTimer } from '@/contexts/TimerContext';
import { toast } from 'sonner';
const Settings: React.FC = () => {
  const {
    settings,
    updateSettings
  } = useSettings();
  const {
    state
  } = useTimer();
  const handleClearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('akGrillTimers');
      localStorage.removeItem('akGrillSettings');
      localStorage.removeItem('akGrillCustomTemplates');
      window.location.reload();
    }
  };
  const handleExportData = () => {
    const data = {
      timers: state.timers,
      settings: settings,
      customTemplates: JSON.parse(localStorage.getItem('akGrillCustomTemplates') || '[]'),
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ak-grill-timer-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Data exported successfully! 📥');
  };
  return <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="text-center mb-8">
        <SettingsIcon className="h-12 w-12 text-primary mx-auto mb-3" />
        <h2 className="text-2xl font-bold mb-2">Settings</h2>
        <p className="text-muted-foreground">
          Customize your grilling experience
        </p>
      </div>

      <div className="space-y-6">
        {/* Temperature Unit */}
        <Card className="grill-card">
          <div className="flex items-center gap-3 mb-4">
            <Thermometer className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Temperature Unit</h3>
          </div>
          
          <RadioGroup value={settings.temperatureUnit} onValueChange={(value: 'C' | 'F') => updateSettings({
          temperatureUnit: value
        })} className="flex gap-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="F" id="fahrenheit" />
              <Label htmlFor="fahrenheit">Fahrenheit (°F)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="C" id="celsius" />
              <Label htmlFor="celsius">Celsius (°C)</Label>
            </div>
          </RadioGroup>
        </Card>

        {/* Notifications */}
        <Card className="grill-card">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications" className="font-medium">Enable Notifications</Label>
                <p className="text-sm text-muted-foreground">Get alerts when timers finish or need flipping</p>
              </div>
              <Switch id="notifications" checked={settings.notificationsEnabled} onCheckedChange={checked => updateSettings({
              notificationsEnabled: checked
            })} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sound" className="font-medium">Sound Alerts</Label>
                <p className="text-sm text-muted-foreground">Play sound with notifications</p>
              </div>
              <Switch id="sound" checked={settings.soundEnabled} onCheckedChange={checked => updateSettings({
              soundEnabled: checked
            })} disabled={!settings.notificationsEnabled} />
            </div>
          </div>
        </Card>

        {/* Data Management */}
        <Card className="grill-card">
          <div className="flex items-center gap-3 mb-4">
            <Download className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Data Management</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Backup & Export</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Export your timers, settings, and custom templates
              </p>
              <Button onClick={handleExportData} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2 text-red-600">Danger Zone</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Clear all saved data including timers, settings, and custom templates
              </p>
              <Button onClick={handleClearAllData} variant="destructive" className="bg-red-600 hover:bg-red-700">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All Data
              </Button>
            </div>
          </div>
        </Card>

      </div>
    </div>;
};
export default Settings;