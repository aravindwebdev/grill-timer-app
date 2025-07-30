
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Flame, Thermometer, Clock, Lightbulb, Zap, Wind } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';

const GrillingGuide: React.FC = () => {
  const { settings, convertTemperature } = useSettings();

  const grillTypes = [
    {
      icon: Flame,
      name: 'Gas Grill',
      description: 'Easy temperature control, quick startup',
      pros: ['Consistent heat', 'Easy cleanup', 'Quick ignition'],
      cons: ['Less smoky flavor', 'Requires gas tank'],
    },
    {
      icon: Wind,
      name: 'Charcoal Grill',
      description: 'Traditional smoky flavor, high heat',
      pros: ['Better flavor', 'Higher temperatures', 'Portable'],
      cons: ['Longer startup', 'Temperature control'],
    },
    {
      icon: Zap,
      name: 'Electric Grill',
      description: 'Indoor/outdoor use, precise control',
      pros: ['Indoor safe', 'Easy cleanup', 'Consistent heat'],
      cons: ['Limited flavor', 'Power dependent'],
    },
  ];

  const temperatureGuide = [
    { food: 'Beef (Rare)', temp: 125, color: 'bg-red-600' },
    { food: 'Beef (Medium Rare)', temp: 135, color: 'bg-red-500' },
    { food: 'Beef (Medium)', temp: 145, color: 'bg-red-400' },
    { food: 'Beef (Well Done)', temp: 160, color: 'bg-gray-600' },
    { food: 'Chicken', temp: 165, color: 'bg-yellow-500' },
    { food: 'Pork', temp: 145, color: 'bg-pink-500' },
    { food: 'Fish', temp: 145, color: 'bg-blue-500' },
    { food: 'Ground Meat', temp: 160, color: 'bg-orange-500' },
  ];

  const grillingTips = [
    {
      category: 'Before Grilling',
      tips: [
        'Clean your grill grates thoroughly',
        'Preheat the grill for 10-15 minutes',
        'Oil the grates to prevent sticking',
        'Let meat reach room temperature (20-30 mins)',
        'Have all tools and ingredients ready',
      ],
    },
    {
      category: 'During Grilling',
      tips: [
        'Don\'t press down on meat with spatula',
        'Only flip once for most foods',
        'Use a meat thermometer for accuracy',
        'Keep the lid closed to maintain temperature',
        'Move food to cooler spots if flare-ups occur',
      ],
    },
    {
      category: 'Safety Tips',
      tips: [
        'Keep a spray bottle for flare-ups',
        'Never leave the grill unattended',
        'Keep raw and cooked foods separate',
        'Clean grill after each use',
        'Check gas connections regularly',
      ],
    },
    {
      category: 'Flavor Enhancement',
      tips: [
        'Marinate for at least 30 minutes',
        'Add wood chips for smoky flavor',
        'Season just before grilling',
        'Let meat rest 5-10 minutes after cooking',
        'Brush with sauce in the last few minutes',
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="text-center mb-8">
        <Lightbulb className="h-12 w-12 text-primary mx-auto mb-3" />
        <h2 className="text-2xl font-bold mb-2">Grilling Guide</h2>
        <p className="text-muted-foreground">
          Master the art of grilling with our comprehensive guide
        </p>
      </div>

      <Tabs defaultValue="tips" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3" style={{backgroundColor: 'hsl(var(--grill-orange))'}}>
          <TabsTrigger value="tips" className="text-white data-[state=active]:text-foreground">Tips & Tricks</TabsTrigger>
          <TabsTrigger value="temperature" className="text-white data-[state=active]:text-foreground">Temperatures</TabsTrigger>
          <TabsTrigger value="equipment" className="text-white data-[state=active]:text-foreground">Equipment</TabsTrigger>
        </TabsList>

        <TabsContent value="tips" className="space-y-6">
          {grillingTips.map((section, index) => (
            <Card key={index} className="grill-card">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Flame className="h-5 w-5 text-primary" />
                {section.category}
              </h3>
              <ul className="space-y-2">
                {section.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="temperature" className="space-y-6">
          <Card className="grill-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-primary" />
              Internal Temperature Guide
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Use a meat thermometer to ensure food safety and perfect doneness
            </p>
            <div className="space-y-3">
              {temperatureGuide.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${item.color}`} />
                    <span className="font-medium">{item.food}</span>
                  </div>
                  <Badge variant="outline" className="font-mono">
                    {convertTemperature(item.temp)}°{settings.temperatureUnit}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="grill-card">
            <h3 className="text-lg font-semibold mb-4">Grill Temperature Zones</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                <h4 className="font-semibold text-red-500 mb-2">High Heat</h4>
                <p className="text-2xl font-mono mb-1">
                  {convertTemperature(450)}°-{convertTemperature(550)}°{settings.temperatureUnit}
                </p>
                <p className="text-xs text-muted-foreground">Searing, burgers</p>
              </div>
              <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <h4 className="font-semibold text-yellow-500 mb-2">Medium Heat</h4>
                <p className="text-2xl font-mono mb-1">
                  {convertTemperature(350)}°-{convertTemperature(450)}°{settings.temperatureUnit}
                </p>
                <p className="text-xs text-muted-foreground">Chicken, fish</p>
              </div>
              <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <h4 className="font-semibold text-green-500 mb-2">Low Heat</h4>
                <p className="text-2xl font-mono mb-1">
                  {convertTemperature(225)}°-{convertTemperature(350)}°{settings.temperatureUnit}
                </p>
                <p className="text-xs text-muted-foreground">Slow cooking</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {grillTypes.map((grill, index) => (
              <Card key={index} className="grill-card text-center">
                <grill.icon className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">{grill.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{grill.description}</p>
                
                <div className="text-left space-y-3">
                  <div>
                    <h4 className="font-medium text-green-600 text-sm mb-1">Pros:</h4>
                    <ul className="text-xs space-y-1">
                      {grill.pros.map((pro, proIndex) => (
                        <li key={proIndex} className="flex items-center gap-1">
                          <div className="w-1 h-1 bg-green-500 rounded-full" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-red-600 text-sm mb-1">Cons:</h4>
                    <ul className="text-xs space-y-1">
                      {grill.cons.map((con, conIndex) => (
                        <li key={conIndex} className="flex items-center gap-1">
                          <div className="w-1 h-1 bg-red-500 rounded-full" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="grill-card">
            <h3 className="text-lg font-semibold mb-4">Essential Grilling Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Long-handled tongs',
                'Meat thermometer',
                'Grill brush',
                'Heat-resistant gloves',
                'Aluminum foil',
                'Spray bottle',
                'Chimney starter (charcoal)',
                'Grill mats or baskets',
              ].map((tool, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm">{tool}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GrillingGuide;
