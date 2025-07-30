import React from 'react';
import { Heart, Mail, Clock, Flame } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Flame className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">About AK Grill Timer</h1>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-lg text-muted-foreground mb-2">
          <span>AK Grill Timer made with</span>
          <Heart className="h-5 w-5 text-red-500 fill-current" />
          <span>by Aravind</span>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <a 
            href="mailto:aravindkumar.webdev@gmail.com" 
            className="hover:text-primary transition-colors"
          >
            aravindkumar.webdev@gmail.com
          </a>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              What is AK Grill Timer?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              AK Grill Timer is a comprehensive grilling companion designed to help you achieve perfect results every time. 
              Whether you're a beginner or a seasoned grill master, this app provides the tools you need to manage 
              multiple timers, get cooking guidance, and never overcook your food again.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Multiple simultaneous timers</li>
              <li>• Pre-configured food presets</li>
              <li>• Custom timer creation</li>
              <li>• Flip and finish notifications</li>
              <li>• Comprehensive grilling guide</li>
              <li>• Temperature recommendations</li>
              <li>• Offline functionality</li>
              <li>• Mobile-responsive design</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Perfect For</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Backyard BBQ enthusiasts</li>
              <li>• Professional grill cooks</li>
              <li>• Weekend warriors</li>
              <li>• Anyone learning to grill</li>
              <li>• Multi-item cooking sessions</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technology</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Built with modern web technologies including React, TypeScript, and Tailwind CSS. 
              Features local storage for offline functionality and browser notifications for reliable alerts.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Card>
          <CardHeader>
            <CardTitle>Get Grilling!</CardTitle>
            <CardDescription>
              Start your grilling journey with confidence. Set your timers, follow the guides, and enjoy perfectly cooked food every time.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>App Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Version: 1.0.0</p>
              <p>Business Collaboration: <a href="mailto:aravindkumar.webdev@gmail.com" className="text-primary hover:underline">aravindkumar.webdev@gmail.com</a></p>
              
              <p className="pt-2 text-xs">© 2025 AK Grill Timer. Made with <Heart className="inline h-3 w-3 text-red-500" fill="currentColor" /> by Aravind</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;