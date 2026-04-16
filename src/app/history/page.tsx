'use client';

import { useMemo, useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUser, useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { MapPin, Clock, CameraOff, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

export default function HistoryPage() {
  const { user, loading: userLoading } = useUser();
  const db = useFirestore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const scanQuery = useMemo(() => {
    if (!db || !user) return null;
    return query(
      collection(db, 'users', user.uid, 'scans'),
      orderBy('timestamp', 'desc')
    );
  }, [db, user]);

  const { data: scans, loading: scansLoading } = useCollection(scanQuery);

  if (userLoading || scansLoading || !isHydrated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-headline font-bold mb-4">Access Denied</h1>
            <p className="text-muted-foreground mb-8">Please login to view your travel discovery history.</p>
            <Link href="/">
              <Badge className="cursor-pointer px-4 py-2">Return Home</Badge>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-headline font-bold mb-2">My Discoveries</h1>
            <p className="text-muted-foreground">A timeline of monuments and heritage sites you've explored with AI Vision.</p>
          </div>

          {scans && scans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {scans.map((scan: any) => (
                <Card key={scan.id} className="overflow-hidden bg-card border hover:shadow-lg transition-all group">
                  <div className="relative h-48 bg-muted">
                    {scan.imageUrl ? (
                      <Image 
                        src={scan.imageUrl} 
                        alt={scan.monumentName} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <CameraOff className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-background/80 backdrop-blur text-foreground">
                        {format(new Date(scan.timestamp), 'MMM d, yyyy')}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-headline font-bold mb-2 group-hover:text-primary transition-colors">
                      {scan.monumentName}
                    </h2>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {scan.location}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {format(new Date(scan.timestamp), 'h:mm a')}
                      </div>
                      <Badge variant="outline" className="text-[8px]">Verified</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-card/50 border-2 border-dashed rounded-[3rem]">
              <CameraOff className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
              <h3 className="text-xl font-headline font-bold mb-2">No Discoveries Yet</h3>
              <p className="text-muted-foreground mb-6">Start scanning monuments to build your digital travel journal.</p>
              <Link href="/scan">
                <Badge className="cursor-pointer px-6 py-2 text-sm">Start Scanning</Badge>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}