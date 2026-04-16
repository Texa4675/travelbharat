
'use client';

import Link from 'next/link';
import { Search, Map, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
            <Link href="/heritage" className="text-sm font-medium hover:text-primary transition-colors">Heritage</Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Link href="/admin">
            <Button variant="outline" className="hidden sm:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Admin Panel
            </Button>
          </Link>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-border">
              <div className="flex flex-col gap-6 mt-8">
                <Link href="/states" className="text-lg font-headline hover:text-primary">States</Link>
                <Link href="/destinations" className="text-lg font-headline hover:text-primary">Destinations</Link>
                <Link href="/heritage" className="text-lg font-headline hover:text-primary">Heritage</Link>
                <Link href="/admin" className="text-lg font-headline hover:text-primary">Admin Login</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
