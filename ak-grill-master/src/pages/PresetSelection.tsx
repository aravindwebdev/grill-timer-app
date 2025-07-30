
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Timer, Thermometer, RotateCcw, Star } from 'lucide-react';
import { useTimer } from '@/contexts/TimerContext';
import { useSettings } from '@/contexts/SettingsContext';

interface FoodPreset {
  id: string;
  name: string;
  icon: string;
  cookTime: number; // in minutes
  flipInterval?: number; // in minutes
  tempRange: { min: number; max: number }; // in Fahrenheit
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tips: string[];
}

const foodPresets: FoodPreset[] = [
  {
    id: 'steak-medium',
    name: 'Steak (Medium)',
    icon: '🥩',
    cookTime: 8,
    flipInterval: 4,
    tempRange: { min: 400, max: 450 },
    description: '1-inch thick steak, perfect medium doneness',
    difficulty: 'Medium',
    tips: ['Let steak reach room temperature first', 'Don\'t press down with spatula']
  },
  {
    id: 'chicken-breast',
    name: 'Chicken Breast',
    icon: '🐔',
    cookTime: 12,
    flipInterval: 6,
    tempRange: { min: 350, max: 400 },
    description: 'Boneless, skinless chicken breast',
    difficulty: 'Easy',
    tips: ['Internal temp should reach 165°F', 'Pound to even thickness']
  },
  {
    id: 'burger',
    name: 'Hamburger',
    icon: '🍔',
    cookTime: 6,
    flipInterval: 3,
    tempRange: { min: 375, max: 425 },
    description: '1/4 lb beef patty, medium doneness',
    difficulty: 'Easy',
    tips: ['Don\'t overwork the meat', 'Make a small indent in center']
  },
  {
    id: 'salmon',
    name: 'Salmon Fillet',
    icon: '🐟',
    cookTime: 10,
    flipInterval: 5,
    tempRange: { min: 400, max: 450 },
    description: '6oz salmon fillet, skin-on recommended',
    difficulty: 'Medium',
    tips: ['Oil the grates well', 'Skin side down first', 'Cook to 145°F internal']
  },
  {
    id: 'veggies-mixed',
    name: 'Mixed Vegetables',
    icon: '🥬',
    cookTime: 8,
    flipInterval: 4,
    tempRange: { min: 350, max: 400 },
    description: 'Bell peppers, zucchini, mushrooms',
    difficulty: 'Easy',
    tips: ['Cut into similar sizes', 'Use grill basket for small pieces']
  },
  {
    id: 'corn',
    name: 'Corn on the Cob',
    icon: '🌽',
    cookTime: 12,
    flipInterval: 3,
    tempRange: { min: 350, max: 400 },
    description: 'Fresh corn with husks removed',
    difficulty: 'Easy',
    tips: ['Soak in water before grilling', 'Rotate frequently']
  },
  {
    id: 'pork-chops',
    name: 'Pork Chops',
    icon: '🍖',
    cookTime: 10,
    flipInterval: 5,
    tempRange: { min: 375, max: 425 },
    description: '1-inch thick bone-in pork chops',
    difficulty: 'Medium',
    tips: ['Brine for extra juiciness', 'Cook to 145°F internal']
  },
  {
    id: 'shrimp',
    name: 'Shrimp Skewers',
    icon: '🍤',
    cookTime: 4,
    flipInterval: 2,
    tempRange: { min: 400, max: 450 },
    description: 'Large shrimp on skewers',
    difficulty: 'Easy',
    tips: ['Don\'t overcook - 2-3 min per side', 'Look for pink color']
  }
];

const PresetSelection: React.FC = () => {
  const navigate = useNavigate();
  const { addTimer } = useTimer();
  const { settings, convertTemperature } = useSettings();

  const startPresetTimer = (preset: FoodPreset) => {
    addTimer({
      name: preset.name,
      duration: preset.cookTime * 60,
      remainingTime: preset.cookTime * 60,
      flipInterval: preset.flipInterval ? preset.flipInterval * 60 : undefined,
      isActive: true,
      isPaused: false,
      notes: preset.description,
    });
    navigate('/timers');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Grilling Presets</h2>
        <p className="text-muted-foreground">
          Select a preset timer for perfect grilling results
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {foodPresets.map((preset) => (
          <Card key={preset.id} className="grill-card hover:scale-105">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">{preset.icon}</div>
              <h3 className="text-lg font-semibold mb-1">{preset.name}</h3>
              <p className="text-sm text-muted-foreground">{preset.description}</p>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Timer className="h-4 w-4 text-primary" />
                  <span>Cook Time:</span>
                </div>
                <span className="font-medium">{preset.cookTime} min</span>
              </div>

              {preset.flipInterval && (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <RotateCcw className="h-4 w-4 text-yellow-500" />
                    <span>Flip Every:</span>
                  </div>
                  <span className="font-medium">{preset.flipInterval} min</span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Thermometer className="h-4 w-4 text-red-500" />
                  <span>Temperature:</span>
                </div>
                <span className="font-medium">
                  {convertTemperature(preset.tempRange.min)}-{convertTemperature(preset.tempRange.max)}°{settings.temperatureUnit}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Difficulty:</span>
                <Badge className={`${getDifficultyColor(preset.difficulty)} text-white`}>
                  {preset.difficulty}
                </Badge>
              </div>
            </div>

            <Button 
              onClick={() => startPresetTimer(preset)}
              className="w-full grill-gradient"
            >
              Start Timer
            </Button>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button 
          onClick={() => navigate('/custom')}
          variant="outline"
          size="lg"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Create Custom Timer
        </Button>
      </div>
    </div>
  );
};

export default PresetSelection;
