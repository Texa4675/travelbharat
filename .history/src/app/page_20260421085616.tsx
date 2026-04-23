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

// ✅ Move outside (prevents re-creation)
const HERO_IMAGES = [
  { src: '/Waters.jpg', alt: 'Ganga' },
  { src: '/delhi.jpg', alt: 'Delhi' },
  { src: '/mp.jpg', alt: 'Madhya Pradesh' },
  { src: '/taj.jpg', alt: 'Taj Mahal' },
  { src: '/train.jpg', alt: 'Railway' },
  { src: '/desert.jpg', alt: 'Thar Desert' },
];

// ✅ Fallback image (must exist in /public)
const FALLBACK_IMAGE = '/fallback.jpg';

export default function Home() {
  const featuredDestinations = DESTINATIONS.slice(0, 4);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);

  // ✅ Optimized slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleExplainAI = async () => {
    setIsExplaining(true);
    try {
      const result = await quickExplain();
      setAiExplanation(result || "No insight generated.");
    } catch (error) {
      console.error(error);
      setAiExplanation("AI is currently unavailable.");
    } finally {
      setIsExplaining(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[90vh] w-full overflow-hidden bg-black rounded-[2rem] mt-4">

        {/* ✅ Only render active image */}
        <Image
          src={HERO_IMAGES[currentImageIndex]?.src || FALLBACK_IMAGE}
          alt={HERO_IMAGES[currentImageIndex]?.alt || "Travel Image"}
          fill
          priority
          className="object-cover transition-all duration-1000 ease-in-out scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-background flex flex-col items-center justify-center text-center px-4 z-10">
          <div className="container mx-auto px-4">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              TravelBharat
            </h1>

            <p className="text-xl md:text-3xl text-white/90 max-w-3xl mx-auto mb-10">
              Uncover the soul of India. From ancient heritage to modern wonders.
            </p>

            <div className="flex gap-4 justify-center">
              <Link href="/states">
                <Button size="lg">Start Journey</Button>
              </Link>

              <Link href="/destinations">
                <Button variant="outline" size="lg">
                  Explore
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {HERO_IMAGES.map((_, i) => (
            <button
            key={i}
            onClick={() => setCurrentImageIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === currentImageIndex ? "true" : "false"}
            className={`h-2 rounded-full ${
              i === currentImageIndex ? 'w-6 bg-white' : 'w-2 bg-white/40'
              }`}/>
          ))}
        </div>
      </section>

      {/* AI SECTION */}
      <section className="py-12">
        <div className="container mx-auto text-center">
          <Button onClick={handleExplainAI} disabled={isExplaining}>
            {isExplaining ? <Loader2 className="animate-spin" /> : <Sparkles />}
            Generate Insight
          </Button>

          {aiExplanation && (
            <p className="mt-4 italic text-sm">"{aiExplanation}"</p>
          )}
        </div>
      </section>

      {/* STATES */}
      <section className="py-16">
        <div className="container mx-auto grid md:grid-cols-3 gap-6">

          {STATES.slice(0, 6).map((state) => (
            <Link key={state.id} href={`/states/${state.id}`}>
              <div className="relative h-80 rounded-xl overflow-hidden">

                <Image
                  src={state.imageUrl || FALLBACK_IMAGE}
                  alt={state.name}
                  fill
                  className="object-cover"
                />

                <div className="absolute bottom-0 p-4 text-white bg-black/50 w-full">
                  {state.name}
                </div>

              </div>
            </Link>
          ))}

        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="py-16">
        <div className="container mx-auto grid md:grid-cols-4 gap-6">

          {featuredDestinations.map((dest) => (
            <Link key={dest.id} href={`/destinations/${dest.id}`}>
              <div className="bg-white rounded-xl overflow-hidden shadow">

                <div className="relative h-40">
                  <Image
                    src={dest.images?.[0] || FALLBACK_IMAGE}
                    alt={dest.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-3">
                  <h4>{dest.name}</h4>
                  <p className="text-xs text-gray-500">{dest.cityName}</p>
                </div>

              </div>
            </Link>
          ))}

        </div>
      </section>

      <Footer />
    </div>
  );
}