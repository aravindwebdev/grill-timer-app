
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Timer, Save, Play } from 'lucide-react';
import { useTimer } from '@/contexts/TimerContext';
import { toast } from 'sonner';

const CustomTimer: React.FC = () => {
  const navigate = useNavigate();
  const { addTimer } = useTimer();
  const [formData, setFormData] = useState({
    name: '',
    hours: 0,
    minutes: 5,
    seconds: 0,
    flipInterval: 0,
    enableFlipAlert: false,
    notes: '',
  });

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getTotalSeconds = () => {
    return (formData.hours * 3600) + (formData.minutes * 60) + formData.seconds;
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter a timer name');
      return false;
    }
    
    const totalSeconds = getTotalSeconds();
    if (totalSeconds <= 0) {
      toast.error('Please set a valid duration');
      return false;
    }
    
    if (formData.enableFlipAlert && formData.flipInterval <= 0) {
      toast.error('Please set a valid flip interval');
      return false;
    }
    
    return true;
  };

  const handleStartTimer = () => {
    if (!validateForm()) return;

    const totalSeconds = getTotalSeconds();
    
    addTimer({
      name: formData.name,
      duration: totalSeconds,
      remainingTime: totalSeconds,
      flipInterval: formData.enableFlipAlert ? formData.flipInterval * 60 : undefined,
      isActive: true,
      isPaused: false,
      notes: formData.notes,
    });

    navigate('/timers');
  };

  const handleSaveTemplate = () => {
    if (!validateForm()) return;

    // Save to localStorage as a custom template
    const savedTemplates = JSON.parse(localStorage.getItem('akGrillCustomTemplates') || '[]');
    const newTemplate = {
      id: Date.now().toString(),
      name: formData.name,
      duration: getTotalSeconds(),
      flipInterval: formData.enableFlipAlert ? formData.flipInterval * 60 : undefined,
      notes: formData.notes,
      createdAt: new Date().toISOString(),
    };
    
    savedTemplates.push(newTemplate);
    localStorage.setItem('akGrillCustomTemplates', JSON.stringify(savedTemplates));
    
    toast.success('Timer template saved! 💾');
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="text-center mb-8">
        <Timer className="h-12 w-12 text-primary mx-auto mb-3" />
        <h2 className="text-2xl font-bold mb-2">Create Custom Timer</h2>
        <p className="text-muted-foreground">
          Set your own timing preferences for any grilling recipe
        </p>
      </div>

      <Card className="grill-card">
        <div className="space-y-6">
          {/* Timer Name */}
          <div>
            <Label htmlFor="name" className="text-sm font-medium">Timer Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g., My Special Ribs"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Duration */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Cooking Duration *</Label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="hours" className="text-xs text-muted-foreground">Hours</Label>
                <Input
                  id="hours"
                  type="number"
                  min="0"
                  max="23"
                  value={formData.hours}
                  onChange={(e) => handleInputChange('hours', parseInt(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="minutes" className="text-xs text-muted-foreground">Minutes</Label>
                <Input
                  id="minutes"
                  type="number"
                  min="0"
                  max="59"
                  value={formData.minutes}
                  onChange={(e) => handleInputChange('minutes', parseInt(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="seconds" className="text-xs text-muted-foreground">Seconds</Label>
                <Input
                  id="seconds"
                  type="number"
                  min="0"
                  max="59"
                  value={formData.seconds}
                  onChange={(e) => handleInputChange('seconds', parseInt(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Total: {Math.floor(getTotalSeconds() / 60)} minutes {getTotalSeconds() % 60} seconds
            </p>
          </div>

          {/* Flip Alert */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Enable Flip Alerts</Label>
                <p className="text-xs text-muted-foreground">Get reminded when to flip your food</p>
              </div>
              <Switch
                checked={formData.enableFlipAlert}
                onCheckedChange={(checked) => handleInputChange('enableFlipAlert', checked)}
              />
            </div>

            {formData.enableFlipAlert && (
              <div>
                <Label htmlFor="flipInterval" className="text-sm font-medium">Flip Every (minutes)</Label>
                <Input
                  id="flipInterval"
                  type="number"
                  min="1"
                  max="60"
                  value={formData.flipInterval}
                  onChange={(e) => handleInputChange('flipInterval', parseInt(e.target.value) || 0)}
                  placeholder="e.g., 3"
                  className="mt-1"
                />
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="text-sm font-medium">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add cooking instructions, temperature settings, or other notes..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleStartTimer}
              className="grill-gradient flex-1"
              size="lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Timer
            </Button>
            
            <Button 
              onClick={handleSaveTemplate}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              size="lg"
            >
              <Save className="mr-2 h-5 w-5" />
              Save Template
            </Button>
          </div>
        </div>
      </Card>

      <div className="mt-6 text-center">
        <Button 
          onClick={() => navigate('/presets')}
          variant="ghost"
          className="text-muted-foreground hover:text-foreground"
        >
          ← Back to Presets
        </Button>
      </div>
    </div>
  );
};

export default CustomTimer;
