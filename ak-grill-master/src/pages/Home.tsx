
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Timer, Book, Flame, Clock } from 'lucide-react';
import { useTimer } from '@/contexts/TimerContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useTimer();
  
  const activeTimersCount = state.timers.filter(timer => timer.isActive && !timer.isPaused).length;

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="grill-gradient p-6 rounded-full">
            <Flame className="h-16 w-16 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-2">Perfect Grilling Every Time</h2>
        <p className="text-muted-foreground text-lg">
          Manage your grill timers like a pro chef
        </p>
        
        {activeTimersCount > 0 && (
          <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-5 w-5 text-primary timer-pulse" />
              <span className="text-primary font-medium">
                {activeTimersCount} timer{activeTimersCount > 1 ? 's' : ''} running
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card 
          className="grill-card cursor-pointer hover:scale-105"
          onClick={() => navigate('/presets')}
        >
          <div className="text-center">
            <Timer className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Start Timer</h3>
            <p className="text-muted-foreground">
              Quick start with preset times
            </p>
          </div>
        </Card>

        <Card 
          className="grill-card cursor-pointer hover:scale-105"
          onClick={() => navigate('/presets')}
        >
          <div className="text-center">
            <Flame className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">View Presets</h3>
            <p className="text-muted-foreground">
              Browse food timing guides
            </p>
          </div>
        </Card>

        <Card 
          className="grill-card cursor-pointer hover:scale-105"
          onClick={() => navigate('/guide')}
        >
          <div className="text-center">
            <Book className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Grilling Guide</h3>
            <p className="text-muted-foreground">
              Tips and temperature charts
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          onClick={() => navigate('/custom')}
          className="h-16 text-lg grill-gradient hover:opacity-90"
          size="lg"
        >
          <Timer className="mr-2 h-6 w-6" />
          Create Custom Timer
        </Button>
        
        <Button 
          onClick={() => navigate('/timers')}
          variant="outline"
          className="h-16 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          size="lg"
        >
          <Clock className="mr-2 h-6 w-6" />
          View Active Timers
        </Button>
      </div>
    </div>
  );
};

export default Home;
