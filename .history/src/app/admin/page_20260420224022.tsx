'use client';

import { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { STATES } from '@/app/lib/data';
import { Wand2, Plus, Edit, Trash2, Loader2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateDestinationDetails } from '@/ai/flows/admin-ai-description-generator';

export default function AdminPage() {
  const { toast } = useToast();
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    state: '',
    city: '',
    category: '',
    description: '',
    history: '',
    insights: [] as string[]
  });

  const handleAIGenerate = async () => {
    if (!formData.name || !formData.state) {
      toast({
        title: "Information Required",
        description: "Please provide at least a Place Name and State for AI generation.",
        variant: "destructive"
      });
      return;
    }

    setIsLoadingAI(true);
    try {
      const result = await generateDestinationDetails({
        placeName: formData.name,
        state: formData.state,
        city: formData.city || undefined,
        category: formData.category || undefined,
        currentDescription: formData.description || undefined
      });

      setFormData(prev => ({
        ...prev,
        description: result.detailedDescription,
        history: result.historicalSignificance,
        insights: result.uniqueInsights
      }));

      toast({
        title: "Content Augmented!",
        description: "AI has successfully enriched the destination details.",
      });
    } catch (error) {
      toast({
        title: "AI Generation Failed",
        description: "Could not generate content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-headline font-bold">Content Management System</h1>
              <p className="text-muted-foreground">Add and manage tourist destinations across TravelBharat.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-primary text-primary">
                <Plus className="h-4 w-4 mr-2" /> Add Bulk
              </Button>
              <Button className="bg-primary text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" /> New Destination
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-primary/20 bg-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Destination Details</CardTitle>
                    <CardDescription>Enter basic info and use AI to augment descriptions.</CardDescription>
                  </div>
                  <Button 
                    onClick={handleAIGenerate} 
                    disabled={isLoadingAI}
                    variant="secondary" 
                    className="bg-accent text-accent-foreground hover:bg-accent/80"
                  >
                    {isLoadingAI ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Wand2 className="h-4 w-4 mr-2" />}
                    AI Augment
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Place Name</label>
                      <Input 
                        placeholder="e.g. Hampi" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">State / UT</label>
                      <Select onValueChange={v => setFormData({...formData, state: v})} value={formData.state}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          {STATES.map(s => (
                            <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold">City</label>
                      <Input 
                        placeholder="e.g. Hosapete" 
                        value={formData.city}
                        onChange={e => setFormData({...formData, city: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Category</label>
                      <Select onValueChange={v => setFormData({...formData, category: v})} value={formData.category}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Heritage">Heritage</SelectItem>
                          <SelectItem value="Nature">Nature</SelectItem>
                          <SelectItem value="Religious">Religious</SelectItem>
                          <SelectItem value="Adventure">Adventure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold">Detailed Description</label>
                    <Textarea 
                      rows={4} 
                      placeholder="Enter description or use AI to generate..." 
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold">Historical Significance</label>
                    <Textarea 
                      rows={4} 
                      placeholder="Historical context..." 
                      value={formData.history}
                      onChange={e => setFormData({...formData, history: e.target.value})}
                    />
                  </div>

                  {formData.insights.length > 0 && (
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Unique Insights (AI Generated)</label>
                      <div className="space-y-2">
                        {formData.insights.map((insight, i) => (
                          <div key={i} className="p-2 bg-muted rounded border text-sm">{insight}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex justify-end gap-2">
                    <Button variant="ghost">Discard Changes</Button>
                    <Button className="bg-primary text-primary-foreground">
                      <Save className="h-4 w-4 mr-2" /> Save Destination
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Entries</CardTitle>
                  <CardDescription>Recently updated tourist spots.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: 'Taj Mahal', state: 'Uttar Pradesh', date: '2 mins ago' },
                    { name: 'Amber Fort', state: 'Rajasthan', date: '1 hour ago' },
                    { name: 'Hampi', state: 'Karnataka', date: 'Yesterday' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
                      <div>
                        <h4 className="font-bold text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.state} • {item.date}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="link" className="w-full text-primary">View All Records</Button>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-sm">Content Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-bold">128</p>
                      <p className="text-xs text-muted-foreground">Destinations</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">28</p>
                      <p className="text-xs text-muted-foreground">States Covered</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}