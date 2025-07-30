
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Trash2, RotateCcw, Clock, Flame } from 'lucide-react';
import { useTimer } from '@/contexts/TimerContext';
import { formatTime } from '@/lib/utils';

const TimerDashboard: React.FC = () => {
  const { state, pauseTimer, resumeTimer, deleteTimer } = useTimer();

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const activeTimers = state.timers.filter(timer => timer.isActive || timer.remainingTime > 0);

  if (activeTimers.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Timer Dashboard</h2>
        
        <div className="text-center py-12">
          <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Active Timers</h3>
          <p className="text-muted-foreground mb-6">
            Start a timer to begin tracking your grilling!
          </p>
          <Button onClick={() => window.location.href = '/presets'} className="grill-gradient">
            Start Your First Timer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Timer Dashboard</h2>
      
      <div className="space-y-4">
        {activeTimers.map((timer) => (
          <Card key={timer.id} className="grill-card">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">{timer.name}</h3>
                  {timer.flipRemaining && timer.flipRemaining <= 60 && (
                    <div className="flex items-center gap-1 text-yellow-500">
                      <RotateCcw className="h-4 w-4" />
                      <span className="text-sm">Flip soon!</span>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Time Left:</span>
                    <div className={`text-2xl font-mono mt-1 ${
                      timer.remainingTime <= 60 ? 'text-red-500 timer-pulse' :
                      timer.remainingTime <= 300 ? 'text-yellow-500' : 'text-primary'
                    }`}>
                      {formatTime(timer.remainingTime)}
                    </div>
                  </div>
                  
                  {timer.flipInterval && (
                    <div>
                      <span className="font-medium">Next Flip:</span>
                      <div className="text-lg font-mono mt-1 text-yellow-500">
                        {timer.flipRemaining ? formatTime(timer.flipRemaining) : 'Now!'}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <span className="font-medium">Status:</span>
                    <div className={`text-lg mt-1 ${
                      timer.isPaused ? 'text-yellow-500' : 
                      timer.isActive ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {timer.isPaused ? 'Paused' : timer.isActive ? 'Running' : 'Complete'}
                    </div>
                  </div>
                </div>

                {timer.notes && (
                  <div className="mt-3 p-2 bg-muted rounded text-sm">
                    <span className="font-medium">Notes:</span> {timer.notes}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 ml-4">
                {timer.isActive && (
                  <Button
                    variant={timer.isPaused ? "default" : "secondary"}
                    size="sm"
                    onClick={() => timer.isPaused ? resumeTimer(timer.id) : pauseTimer(timer.id)}
                  >
                    {timer.isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  </Button>
                )}
                
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteTimer(timer.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button 
          onClick={() => window.location.href = '/presets'}
          className="grill-gradient"
          size="lg"
        >
          Add Another Timer
        </Button>
      </div>
    </div>
  );
};

export default TimerDashboard;
