'use client';

import { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { STATES } from '@/app/lib/data';
import { Sparkles, Compass, Plane } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const INTERESTS = ['Heritage', 'Nature', 'Religious', 'Adventure', 'Cuisine', 'Photography'];

export default function ItineraryPage() {
  const { toast } = useToast();
  const [selectedState, setSelectedState] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [days, setDays] = useState('3');

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleGenerate = () => {
    if (!selectedState || selectedInterests.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select a state and at least one interest.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Coming Soon",
      description: "AI itinerary generation is not available in this version.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <Badge className="bg-primary/20 text-primary hover:bg-primary/30 mb-4 px-4 py-1 rounded-full text-sm font-bold">
              <Sparkles className="h-4 w-4 mr-2 inline" /> Travel Planner
            </Badge>
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4">Your Custom Bharat Journey</h1>
            <p className="text-muted-foreground text-lg">
              Configure your trip preferences and discover the best of India.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1">
              <Card className="border-primary/20 sticky top-24">
                <CardHeader>
                  <CardTitle>Plan Your Trip</CardTitle>
                  <CardDescription>Customize your travel preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-bold">Select State</Label>
                    <Select onValueChange={setSelectedState} value={selectedState}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a state..." />
                      </SelectTrigger>
                      <SelectContent>
                        {STATES.map(s => (
                          <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-bold">Duration</Label>
                    <Select onValueChange={setDays} value={days}>
                      <SelectTrigger>
                        <SelectValue placeholder="Days" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 5, 7].map(d => (
                          <SelectItem key={d} value={d.toString()}>{d} {d === 1 ? 'Day' : 'Days'}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-bold">Interests</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {INTERESTS.map(interest => (
                        <div key={interest} className="flex items-center space-x-2">
                          <Checkbox
                            id={interest}
                            checked={selectedInterests.includes(interest)}
                            onCheckedChange={() => toggleInterest(interest)}
                          />
                          <label htmlFor={interest} className="text-sm cursor-pointer">{interest}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-xl"
                  >
                    <Compass className="h-5 w-5 mr-2" />
                    Generate Itinerary
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <div className="h-full flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-[3rem] opacity-40">
                <Plane className="h-16 w-16 mb-4 text-muted-foreground" />
                <h3 className="text-xl font-headline font-bold">Configure Your Trip</h3>
                <p className="max-w-xs mx-auto">Select your state, duration, and interests to get started.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
