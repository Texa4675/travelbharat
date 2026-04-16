
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { STATES } from '@/app/lib/data';
import { MapPin } from 'lucide-react';

export default function StatesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">Indian States & Union Territories</h1>
          <p className="text-muted-foreground text-lg">
            Navigate through the vast geography of India. Select a state to discover its hidden gems, local culture, and world-renowned attractions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {STATES.map((state) => (
            <Link key={state.id} href={`/states/${state.id}`} className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all">
              <div className="relative h-48">
                <Image
                  src={state.imageUrl}
                  alt={state.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  data-ai-hint={state.imageHint}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-primary mb-2">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="text-xs font-bold uppercase tracking-widest">{state.capital}</span>
                </div>
                <h2 className="text-xl font-headline font-bold mb-2 group-hover:text-primary transition-colors">
                  {state.name}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {state.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
