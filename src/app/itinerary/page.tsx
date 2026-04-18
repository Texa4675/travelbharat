'use client';

import { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { STATES } from '@/app/lib/data';
import { Sparkles, Clock, Compass, Loader2, Plane, Briefcase, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateItinerary, type ItineraryOutput } from '@/ai/flows/itinerary-planner-flow';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const INTERESTS = ['Heritage', 'Nature', 'Religious', 'Adventure', 'Cuisine', 'Photography'];

export default function ItineraryPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ItineraryOutput | null>(null);
  const [selectedState, setSelectedState] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [days, setDays] = useState('3');
  const [customDays, setCustomDays] = useState('3');
  const [isCustomDays, setIsCustomDays] = useState(false);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleDaysChange = (value: string) => {
    if (value === 'custom') {
      setIsCustomDays(true);
      setDays('custom');
    } else {
      setIsCustomDays(false);
      setDays(value);
      setCustomDays(value);
    }
  };

  const handleGenerate = async () => {
    if (!selectedState || selectedInterests.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select a state and at least one interest.",
        variant: "destructive"
      });
      return;
    }

    const duration = isCustomDays ? parseInt(customDays) : parseInt(days);
    
    if (isNaN(duration) || duration < 1 || duration > 7) {
      toast({
        title: "Invalid Duration",
        description: "Please enter a trip duration between 1 and 7 days.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const data = await generateItinerary({
        state: selectedState,
        interests: selectedInterests,
        durationDays: duration
      });
      setResult(data);
      toast({
        title: "Itinerary Ready!",
        description: "Your personalized Bharat journey has been curated.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Our AI guide is currently busy. Please try again in a moment.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <Badge className="bg-primary/20 text-primary hover:bg-primary/30 mb-4 px-4 py-1 rounded-full text-sm font-bold">
              <Sparkles className="h-4 w-4 mr-2 inline" /> AI-Powered Travel Planner
            </Badge>
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4">Your Custom Bharat Journey</h1>
            <p className="text-muted-foreground text-lg">
              Tell us where you want to go and what you love. Our AI curator will craft a perfectly paced itinerary just for you.
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
                    <div className="space-y-2">
                      <Select onValueChange={handleDaysChange} value={days}>
                        <SelectTrigger>
                          <SelectValue placeholder="Days" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 5, 7].map(d => (
                            <SelectItem key={d} value={d.toString()}>{d} {d === 1 ? 'Day' : 'Days'}</SelectItem>
                          ))}
                          <SelectItem value="custom">Custom...</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {isCustomDays && (
                        <div className="pt-2">
                          <Input 
                            type="number" 
                            min="1" 
                            max="7" 
                            placeholder="Enter days (1-7)" 
                            value={customDays}
                            onChange={(e) => setCustomDays(e.target.value)}
                            className="bg-background"
                          />
                          <p className="text-[10px] text-muted-foreground mt-1">Maximum 7 days recommended for detail.</p>
                        </div>
                      )}
                    </div>
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
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-xl"
                  >
                    {isLoading ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Compass className="h-5 w-5 mr-2" />}
                    Generate Itinerary
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              {!result && !isLoading && (
                <div className="h-full flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-[3rem] opacity-40">
                  <Plane className="h-16 w-16 mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-headline font-bold">No Itinerary Generated Yet</h3>
                  <p className="max-w-xs mx-auto">Configure your trip on the left to see our AI recommendations.</p>
                </div>
              )}

              {isLoading && (
                <div className="space-y-6">
                  <Card className="animate-pulse">
                    <div className="h-8 w-1/3 bg-muted rounded m-6" />
                    <CardContent className="space-y-4">
                      <div className="h-24 bg-muted rounded" />
                      <div className="h-24 bg-muted rounded" />
                      <div className="h-24 bg-muted rounded" />
                    </CardContent>
                  </Card>
                </div>
              )}

              {result && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-4">
                    <h2 className="text-4xl font-headline font-bold text-primary">{result.title}</h2>
                    <p className="text-muted-foreground italic leading-relaxed text-lg">
                      "{result.overview}"
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="border-primary/30 text-primary uppercase tracking-widest text-[10px] py-1">
                        Budget: {result.budgetCategory}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    {result.days.map((dayPlan) => (
                      <div key={dayPlan.day} className="relative pl-8 border-l-2 border-primary/20 pb-8 last:pb-0">
                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary" />
                        <div className="mb-4">
                          <span className="text-xs font-bold uppercase tracking-widest text-primary">Day {dayPlan.day}</span>
                          <h3 className="text-2xl font-headline font-bold">{dayPlan.theme}</h3>
                        </div>
                        
                        <div className="space-y-4">
                          {dayPlan.activities.map((activity, idx) => (
                            <Card key={idx} className="bg-card/50 border-primary/10 hover:border-primary/30 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex items-start gap-4">
                                  <div className="bg-primary/10 p-2 rounded-lg">
                                    <Clock className="h-4 w-4 text-primary" />
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-bold uppercase text-muted-foreground">{activity.time}</span>
                                      <h4 className="font-bold">{activity.place}</h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                                    {activity.tip && (
                                      <div className="mt-2 flex items-center gap-2 text-[10px] text-primary font-bold bg-primary/5 px-2 py-1 rounded w-fit">
                                        <Info className="h-3 w-3" /> TIP: {activity.tip}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Card className="bg-primary text-primary-foreground border-none shadow-2xl overflow-hidden relative">
                    <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                      <Briefcase className="w-48 h-48" />
                    </div>
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-headline font-bold mb-4 flex items-center gap-2">
                        <Briefcase className="h-6 w-6" /> Packing Essentials
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {result.packingEssentials.map((item, i) => (
                          <div key={i} className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                            <div className="w-2 h-2 rounded-full bg-white" />
                            <span className="text-sm font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
