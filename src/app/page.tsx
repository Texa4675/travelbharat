
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { Button } from '@/components/ui/button';
import { STATES } from '@/app/lib/data';
import { ArrowRight, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <Image
          src="https://picsum.photos/seed/india-hero/1920/1080"
          alt="Incredible India Landscape"
          fill
          className="object-cover"
          priority
          data-ai-hint="India landscape"
        />
        <div className="absolute inset-0 hero-gradient flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-white mb-6 drop-shadow-lg">
            TravelBharat
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-8 font-body drop-shadow-md">
            Journey through the diverse landscapes and timeless heritage of India, state by state.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/states">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8">
                Explore States
              </Button>
            </Link>
            <Link href="/destinations">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20 text-lg px-8">
                Discover Places
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured States */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-headline font-bold mb-4">Discover India</h2>
              <p className="text-muted-foreground max-w-xl">
                From the snowy peaks of Himalayas to the golden sands of Kanyakumari, explore the unique essence of every Indian state.
              </p>
            </div>
            <Link href="/states" className="hidden md:flex items-center gap-2 text-primary hover:underline font-bold">
              View All States <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STATES.slice(0, 6).map((state) => (
              <Link key={state.id} href={`/states/${state.id}`} className="group relative h-80 overflow-hidden rounded-xl">
                <Image
                  src={state.imageUrl}
                  alt={state.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  data-ai-hint={state.imageHint}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium uppercase tracking-wider">{state.capital}</span>
                  </div>
                  <h3 className="text-2xl font-headline font-bold">{state.name}</h3>
                  <p className="text-white/80 line-clamp-2 mt-2 text-sm">
                    {state.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/states">
              <Button variant="outline" className="border-primary text-primary">
                View All States
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories / Themes */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-headline font-bold mb-12">Explore by Theme</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Heritage', icon: '🏰', hint: 'heritage' },
              { name: 'Nature', icon: '🌿', hint: 'nature' },
              { name: 'Religious', icon: '🙏', hint: 'religious' },
              { name: 'Adventure', icon: '🏔️', hint: 'adventure' }
            ].map((cat) => (
              <Link key={cat.name} href={`/destinations?category=${cat.name}`} className="p-8 rounded-xl bg-background border hover:border-primary transition-all group">
                <span className="text-4xl mb-4 block group-hover:scale-125 transition-transform">{cat.icon}</span>
                <h3 className="text-xl font-headline font-bold">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
