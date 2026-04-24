import { STATES, DESTINATIONS } from '@/app/lib/data';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return STATES.map((state) => ({
    stateId: state.id.toString(),
  }));
}
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Calendar, Clock, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default async function StateDetailPage({ params }: { params: { stateId: string } }) {
  const { stateId } = params;

  const state = STATES.find((s) => s.id.toString() === stateId);

  if (!state) {
    notFound();
  }

  const destinations = DESTINATIONS.filter(
    (d) => d.stateId.toString() === stateId
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* State Hero */}
      <section className="relative h-[60vh] w-full">
        <Image
          src={state.imageUrl}
          alt={state.name}
          fill
          className="object-cover"
          priority
          data-ai-hint={state.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent flex flex-col justify-end p-8 md:p-16">
          <div className="container mx-auto">
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
              <Link href="/states" className="hover:text-white">States</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary font-bold">{state.name}</span>
            </nav>
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-white mb-4">
              {state.name}
            </h1>
            <div className="flex items-center gap-2 text-white/90">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-xl">Capital: <span className="text-primary">{state.capital}</span></span>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-headline font-bold mb-6">About {state.name}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              {state.description}
              Stay tuned for more detailed cultural and historical insights about {state.name}. Our team is working with historians to bring you verified facts and local secrets.
            </p>

            <h3 className="text-2xl font-headline font-bold mb-8">Popular Destinations</h3>
            {destinations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {destinations.map((dest) => (
                  <Link key={dest.id} href={`/destinations/${dest.id}`} className="group block bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all">
                    <div className="relative h-56">
                      <Image
                        src={dest.images[0]}
                        alt={dest.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        data-ai-hint={dest.imageHints[0]}
                      />
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                        {dest.category}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-headline font-bold mb-2 group-hover:text-primary transition-colors">
                        {dest.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {dest.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {dest.cityName}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {dest.bestTime}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-xl bg-muted/30 border border-dashed">
                <p className="text-muted-foreground italic">No destinations listed for this state yet. Check back soon!</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div className="bg-card border p-6 rounded-xl">
                <h3 className="text-xl font-headline font-bold mb-4">At a Glance</h3>
                <ul className="space-y-4">
                  <li className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Best Time to Visit</span>
                    <span className="font-bold">Oct - Mar</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Languages</span>
                    <span className="font-bold">Regional, Hindi, English</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Famous For</span>
                    <span className="font-bold text-right">Heritage, Culture</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl overflow-hidden relative h-64 border">
                <Image
                  src="https://picsum.photos/seed/map-placeholder/400/600"
                  alt="Map view"
                  fill
                  className="object-cover grayscale opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-4 bg-background/80 backdrop-blur rounded-lg border">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Interactive Map</p>
                    <p className="text-sm">Explore {state.name} Geographically</p>
                    <Badge variant="outline" className="mt-4">Coming Soon</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
