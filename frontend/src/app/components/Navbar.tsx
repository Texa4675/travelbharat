
'use client';

import Link from 'next/link';
import { Camera, Menu, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-headline font-bold text-primary group-hover:text-primary/80 transition-colors">
              TravelBharat
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/states" className="text-sm font-medium hover:text-primary transition-colors">States</Link>
            <Link href="/destinations" className="text-sm font-medium hover:text-primary transition-colors">Destinations</Link>
            <Link href="/scan" className="text-sm font-bold flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors">
              <Camera className="h-4 w-4" /> Scan
            </Link>
            <Link href="/itinerary" className="text-sm font-medium hover:text-primary transition-colors">Itinerary</Link>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all">
            <LogIn className="h-4 w-4 mr-2" /> Login
          </Button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background border-border">
            <div className="flex flex-col gap-6 mt-8">
              <Link href="/states" onClick={() => setIsOpen(false)} className="text-lg font-headline hover:text-primary">States</Link>
              <Link href="/destinations" onClick={() => setIsOpen(false)} className="text-lg font-headline hover:text-primary">Destinations</Link>
              <Link href="/scan" onClick={() => setIsOpen(false)} className="text-lg font-headline text-primary flex items-center gap-2 font-bold">
                <Camera className="h-5 w-5" /> Scan Monument
              </Link>
              <Link href="/itinerary" onClick={() => setIsOpen(false)} className="text-lg font-headline hover:text-primary">Itinerary</Link>
              <Button className="w-full mt-2">
                <LogIn className="h-4 w-4 mr-2" /> Login
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
