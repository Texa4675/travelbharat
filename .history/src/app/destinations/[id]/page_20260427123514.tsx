import { DESTINATIONS, STATES } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Calendar,
  Clock,
  History,
  Lightbulb,
  Share2,
  Heart,
  ExternalLink,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return DESTINATIONS.map((dest) => ({
    id: String(dest.id),
  }));
}

export default function DestinationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const destination = DESTINATIONS.find(
    (d) => String(d.id) === params.id
  );

  if (!destination) {
    notFound();
  }

  const state = STATES.find((s) => s.id === destination.stateId);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Gallery Hero */}
        <section className="bg-card">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[60vh]">
              <div className="md:col-span-3 relative rounded-2xl overflow-hidden border">
                <Image
                  src={destination.images[0]}
                  alt={destination.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="hidden md:flex flex-col gap-4">
                <div className="relative flex-1 rounded-2xl overflow-hidden border">
                  <Image
                    src={destination.images[1] || destination.images[0]}
                    alt={`${destination.name} view 2`}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="relative flex-1 rounded-2xl overflow-hidden border group cursor-pointer">
                  <Image
                    src="https://picsum.photos/seed/more-images/400/400"
                    alt="View Gallery"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold">
                      + View Gallery
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* LEFT */}
              <div className="lg:col-span-2">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge className="bg-primary text-primary-foreground">
                    {destination.category}
                  </Badge>

                  <Link
                    href={`/states/${destination.stateId}`}
                    className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                  >
                    <MapPin className="h-3 w-3" />
                    {state?.name}
                  </Link>
                </div>

                <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">
                  {destination.name}
                </h1>

                <div className="flex flex-wrap gap-6 mb-8 text-sm text-muted-foreground border-y py-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>
                      Best Time: <strong>{destination.bestTime}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>
                      Duration: <strong>2-3 Hours</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{destination.cityName}</span>
                  </div>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="bg-card border w-full justify-start p-1 rounded-xl">
                    <TabsTrigger value="overview">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="history">
                      History
                    </TabsTrigger>
                    <TabsTrigger value="insights">
                      Insights
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-8">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {destination.description}
                    </p>
                  </TabsContent>

                  <TabsContent value="history" className="mt-8">
                    <div className="p-8 rounded-2xl bg-card border">
                      <div className="flex items-start gap-4">
                        <History className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h3 className="text-xl font-bold mb-4">
                            Historical Importance
                          </h3>
                          <p className="text-muted-foreground italic">
                            {destination.historicalSignificance}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="insights" className="mt-8">
                    <div className="space-y-4">
                      {destination.uniqueInsights?.map(
                        (insight, idx) => (
                          <div
                            key={idx}
                            className="flex gap-4 p-4 rounded-xl bg-primary/5 border"
                          >
                            <Lightbulb className="h-5 w-5 text-primary" />
                            <p className="text-sm">{insight}</p>
                          </div>
                        )
                      )}

                      {!destination.uniqueInsights && (
                        <p className="text-muted-foreground">
                          AI insights coming soon.
                        </p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6">
                    Nearby Attractions
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {destination.nearbyAttractions.map((attr) => (
                      <div
                        key={attr}
                        className="p-4 rounded-xl bg-card border flex items-center gap-3"
                      >
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-sm">{attr}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  <div className="bg-card border p-6 rounded-2xl">
                    <div className="flex gap-3 mb-6">
                      <Button className="flex-1">
                        <Heart className="h-4 w-4 mr-2" />
                        Save
                      </Button>

                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <a
                      href={destination.locationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full" variant="secondary">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open in Maps
                      </Button>
                    </a>
                  </div>

                  <div className="p-6 rounded-2xl bg-secondary/10 border">
                    <h4 className="font-bold mb-2">Pro Tip</h4>
                    <p className="text-sm text-muted-foreground italic">
                      Visit early morning for best experience and fewer crowds.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
