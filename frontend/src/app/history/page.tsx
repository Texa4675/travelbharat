'use client';

import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { Badge } from '@/components/ui/badge';
import { CameraOff } from 'lucide-react';
import Link from 'next/link';

export default function HistoryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-headline font-bold mb-2">My Discoveries</h1>
            <p className="text-muted-foreground">A timeline of monuments and heritage sites you've explored.</p>
          </div>

          <div className="py-24 text-center bg-card/50 border-2 border-dashed rounded-[3rem]">
            <CameraOff className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
            <h3 className="text-xl font-headline font-bold mb-2">No Discoveries Yet</h3>
            <p className="text-muted-foreground mb-6">Start scanning monuments to build your digital travel journal.</p>
            <Link href="/scan">
              <Badge className="cursor-pointer px-6 py-2 text-sm">Start Scanning</Badge>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}