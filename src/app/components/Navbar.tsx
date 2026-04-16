'use client';

import Link from 'next/link';
import { Search, Camera, History, User, LogIn, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useUser, useAuth } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Navbar() {
  const { user } = useUser();
  const auth = useAuth();

  const handleLogin = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
  };

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
            {user && (
              <Link href="/history" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1.5">
                <History className="h-4 w-4" /> My Scans
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/admin">
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">Admin</Button>
                </Link>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border border-primary/20">
                    <AvatarImage src={user.photoURL || ''} />
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                  <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                    <LogOut className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            ) : (
              <Button onClick={handleLogin} variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <LogIn className="h-4 w-4 mr-2" /> Login
              </Button>
            )}
          </div>
          
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
                <Link href="/scan" className="text-lg font-headline text-primary flex items-center gap-2 font-bold">
                  <Camera className="h-5 w-5" /> Scan Monument
                </Link>
                {user && (
                  <Link href="/history" className="text-lg font-headline hover:text-primary flex items-center gap-2">
                    <History className="h-5 w-5" /> My Scans
                  </Link>
                )}
                {!user ? (
                  <Button onClick={handleLogin} className="mt-4 w-full">Login with Google</Button>
                ) : (
                  <Button onClick={handleLogout} variant="outline" className="mt-4 w-full">Logout</Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}