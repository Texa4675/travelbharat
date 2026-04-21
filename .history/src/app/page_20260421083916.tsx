
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { Button } from '@/components/ui/button';
import { STATES, DESTINATIONS } from '@/app/lib/data';
import { ArrowRight, MapPin, Sparkles, Globe, ShieldCheck, Compass, CheckCircle2, Loader2 } from 'lucide-react';
import { quickExplain } from '@/ai/flows/quick-explain-flow';

export default function Home() {
  const featuredDestinations = DESTINATIONS.slice(0, 4);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);

  const heroImages = [
    <img src="/Waters.jpg" alt="Ganga"></img>,
    <img src="/delhi.jpg" alt="Ganga"></img>,
    <img src="/mp.jpg" alt="Ganga"></img>,
    <img src="/taj.jpg" alt="Ganga"></img>,
    <img src="/train.jpg" alt="Ganga"></img>,


  ];

  useEffect(() => {
    if (heroImages.length === 0) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const handleExplainAI = async () => {
    setIsExplaining(true);
    try {
      const result = await quickExplain();
      setAiExplanation(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsExplaining(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <section className="relative h-[90vh] w-full overflow-hidden bg-black rounded-[2rem] mt-4">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.url}
              alt={`India Landscape ${index + 1}`}
              fill
              className="object-cover scale-105"
              priority={index === 0}
              data-ai-hint={image.hint}
            />
          </div>
        ))}
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-background flex flex-col items-center justify-center text-center px-4 z-10">
          <div className="container mx-auto px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-6xl md:text-8xl font-headline font-bold text-white mb-6 drop-shadow-2xl">
              TravelBharat
            </h1>
            <p className="text-xl md:text-3xl text-white/95 max-w-3xl mx-auto mb-10 font-body drop-shadow-lg leading-relaxed">
              Uncover the soul of India. From ancient heritage to modern wonders, explore the subcontinent state by state.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/states">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xl px-10 py-7 rounded-full transition-all hover:scale-105">
                  Start Your Journey
                </Button>
              </Link>
              <Link href="/destinations">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20 text-xl px-10 py-7 rounded-full backdrop-blur-sm transition-all hover:scale-105">
                  Explore Places
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentImageIndex ? 'w-8 bg-primary' : 'w-2 bg-white/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Quick AI Insights Section */}
      <section className="py-12 bg-accent/10 border-b my-8 rounded-[2rem]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-3xl bg-card border border-primary/20">
            <div className="max-w-xl">
              <h2 className="text-2xl font-headline font-bold mb-2">Quick AI Insights</h2>
              <p className="text-muted-foreground text-sm">
                TravelBharat uses advanced AI to help you identify monuments and plan itineraries. Want a quick tip on how it works?
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Button 
                onClick={handleExplainAI} 
                disabled={isExplaining}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8"
              >
                {isExplaining ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                Generate Insight
              </Button>
              {aiExplanation && (
                <div className="p-4 bg-muted rounded-2xl text-xs italic text-center max-w-sm animate-in fade-in slide-in-from-top-2">
                  "{aiExplanation}"
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card border-y rounded-[2rem] my-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'States & UTs', value: '36' },
              { label: 'Destinations', value: '500+' },
              { label: 'Cultural Sites', value: '150+' },
              { label: 'Verified Facts', value: '10k+' }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <p className="text-4xl md:text-5xl font-headline font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6">Redefining Indian Tourism</h2>
            <p className="text-muted-foreground text-lg">
              We bridge the gap between curiosity and discovery with a platform built for the modern traveler seeking authentic experiences.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'State-Centric Guides',
                desc: 'Deep dive into each state\'s unique identity, culture, and cuisine with curated regional guides.',
                icon: <Globe className="h-10 w-10 text-primary" />
              },
              {
                title: 'AI-Enhanced Insights',
                desc: 'Get unique historical context and travel tips powered by advanced AI curation for every landmark.',
                icon: <Sparkles className="h-10 w-10 text-primary" />
              },
              {
                title: 'Verified Heritage',
                desc: 'Historical data and significance cross-checked with official tourism records for accuracy.',
                icon: <ShieldCheck className="h-10 w-10 text-primary" />
              }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 rounded-3xl bg-card border hover:border-primary/50 transition-colors">
                <div className="mb-6 p-4 bg-primary/10 rounded-2xl">{feature.icon}</div>
                <h3 className="text-2xl font-headline font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30 rounded-[3rem] my-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">The Tapestry of India</h2>
              <p className="text-muted-foreground text-lg">
                Explore our featured states. Each one is a world in itself, offering distinct landscapes and timeless stories.
              </p>
            </div>
            <Link href="/states" className="flex items-center gap-2 text-primary hover:underline font-bold text-lg group">
              View All States <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STATES.slice(0, 6).map((state) => (
              <Link key={state.id} href={`/states/${state.id}`} className="group relative h-[450px] overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src={state.imageUrl}
                  alt={state.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  data-ai-hint={state.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest text-primary-foreground bg-primary px-2 py-0.5 rounded">
                      {state.capital}
                    </span>
                  </div>
                  <h3 className="text-3xl font-headline font-bold mb-3">{state.name}</h3>
                  <p className="text-white/80 line-clamp-2 text-sm leading-relaxed mb-4">
                    {state.description}
                  </p>
                  <Button variant="link" className="text-white p-0 h-auto font-bold group-hover:text-primary transition-colors">
                    Explore State <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">Trending Now</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The most visited and highly-rated landmarks across the country this season.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((dest) => (
              <Link key={dest.id} href={`/destinations/${dest.id}`} className="group bg-card rounded-2xl border overflow-hidden hover:shadow-2xl transition-all">
                <div className="relative h-48">
                  <Image
                    src={dest.images[0]}
                    alt={dest.name}
                    fill
                    className="object-cover"
                    data-ai-hint={dest.imageHints[0]}
                  />
                  <div className="absolute top-3 right-3 bg-background/80 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold uppercase">
                    {dest.category}
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-headline font-bold text-xl mb-1 group-hover:text-primary transition-colors">{dest.name}</h4>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs mb-3">
                    <MapPin className="h-3 w-3" />
                    {dest.cityName}, {STATES.find(s => s.id === dest.stateId)?.name}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 italic mb-4">
                    "{dest.description}"
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-bold text-primary pt-3 border-t">
                    <span>BEST TIME: {dest.bestTime.toUpperCase()}</span>
                    <Compass className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card rounded-[3rem] my-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">Journey by Theme</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find your perfect escape by filtering through India's diverse travel experiences.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Heritage', icon: '🏰', count: '120+ Places', desc: 'Ancient forts & palaces' },
              { name: 'Nature', icon: '🌿', count: '85+ Places', desc: 'Mountains & backwaters' },
              { name: 'Religious', icon: '🙏', count: '200+ Places', desc: 'Spiritual soul of India' },
              { name: 'Adventure', icon: '🏔️', count: '50+ Places', desc: 'Thrills in the wild' }
            ].map((cat) => (
              <Link key={cat.name} href={`/destinations?category=${cat.name}`} className="relative p-10 rounded-3xl bg-background border hover:border-primary hover:shadow-xl transition-all group overflow-hidden">
                <div className="absolute -right-4 -top-4 text-8xl opacity-5 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <span className="text-5xl mb-6 block group-hover:scale-125 transition-transform origin-left">{cat.icon}</span>
                <h3 className="text-2xl font-headline font-bold mb-2">{cat.name}</h3>
                <p className="text-xs text-primary font-bold mb-4 uppercase tracking-widest">{cat.count}</p>
                <p className="text-sm text-muted-foreground">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden rounded-[3rem] my-8 mx-4">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-bold">
                <span className="animate-pulse">✨</span> Powered by Genkit AI
              </div>
              <h2 className="text-5xl md:text-6xl font-headline font-bold leading-tight">
                Plan Smarter with Our AI Curator
              </h2>
              <p className="text-xl text-primary-foreground/80 leading-relaxed">
                Our advanced AI models analyze thousands of historical records and traveler reviews to provide you with verified facts, unique insights, and personalized suggestions.
              </p>
              <ul className="space-y-4">
                {[
                  'Instant historical background generation',
                  'Pro-tips for every destination',
                  'AI-curated multi-day itineraries',
                  'Verified cultural significance data'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 font-medium">
                    <CheckCircle2 className="h-6 w-6 text-white" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/itinerary">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-full font-bold shadow-lg">
                  Plan AI Itinerary
                </Button>
              </Link>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
              <Image
                src="https://picsum.photos/seed/ai-travel/1000/1000"
                alt="AI Travel Curation"
                fill
                className="object-cover"
                data-ai-hint="AI technology"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="p-12 md:p-20 rounded-[4rem] bg-card border border-primary/20 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6">India Awaits Your Discovery</h2>
            <p className="text-muted-foreground text-xl mb-10 leading-relaxed">
              Don't just travel. Explore the rich tapestry of a billion dreams and a thousand cultures. Start your Bharat journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/states">
                <Button size="lg" className="px-10 py-7 text-lg rounded-full">
                  Browse All States
                </Button>
              </Link>
              <div className="text-sm font-medium text-muted-foreground italic">
                Verified guides for 28 States & 8 Union Territories
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
