'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { DESTINATIONS, STATES } from '@/app/lib/data';
import { Search, MapPin, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter(dest => {
      const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            dest.cityName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesState = selectedState === 'all' || dest.stateId === selectedState;
      const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
      return matchesSearch && matchesState && matchesCategory;
    });
  }, [searchQuery, selectedState, selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h1 className="text-4xl font-headline font-bold mb-4">Discover India's Treasures</h1>
              <p className="text-muted-foreground">Explore curated tourist places, historic monuments, and scenic landscapes across all of Bharat.</p>
            </div>
          </div>

          <div className="p-4 bg-card border rounded-2xl mb-12 flex flex-col lg:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by place or city..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="w-full sm:w-48">
                <Select onValueChange={setSelectedState} value={selectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {STATES.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full sm:w-48">
                <Select onValueChange={setSelectedCategory} value={selectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Heritage">Heritage</SelectItem>
                    <SelectItem value="Nature">Nature</SelectItem>
                    <SelectItem value="Adventure">Adventure</SelectItem>
                    <SelectItem value="Religious">Religious</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="ghost" className="hidden lg:flex" onClick={() => {
                setSearchQuery('');
                setSelectedState('all');
                setSelectedCategory('all');
              }}>
                Clear Filters
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => (
              <Link key={dest.id} href={`/destinations/${dest.id}`} className="group bg-card rounded-2xl border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all">
                <div className="relative h-64">
                  <Image
                    src={dest.images[0]}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    data-ai-hint={dest.imageHints[0]}
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-background/80 backdrop-blur text-foreground border-primary/20">
                      {dest.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                    <MapPin className="h-3 w-3" />
                    {STATES.find(s => s.id === dest.stateId)?.name} • {dest.cityName}
                  </div>
                  <h2 className="text-2xl font-headline font-bold mb-3 group-hover:text-primary transition-colors">
                    {dest.name}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-6">
                    {dest.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {dest.bestTime}
                    </div>
                    <Button variant="link" className="text-primary p-0 h-auto font-bold">
                      Learn More
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-xl text-muted-foreground">No destinations found matching your criteria.</p>
              <Button variant="link" className="text-primary mt-2" onClick={() => {
                setSearchQuery('');
                setSelectedState('all');
                setSelectedCategory('all');
              }}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}