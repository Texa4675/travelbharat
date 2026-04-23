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
    { src: '/Waters.jpg', alt: 'Ganga' },
    { src: '/delhi.jpg', alt: 'Delhi' },
    { src: '/mp.jpg', alt: 'Madhya Pradesh' },
    { src: '/taj.jpg', alt: 'Taj Mahal' },
    { src: '/train.jpg', alt: 'Railway' },
    { src: '/desert.jpg', alt: 'Thar Desert' },
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
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              className="object-cover scale-105"
              priority={index === 0}
              onError={(e: any) => {
                e.target.src = "/fallback.jpg"; // make sure this exists in /public
              }}
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

      {/* KEEP REST SAME — no changes needed */}

      <Footer />
    </div>
  );
}