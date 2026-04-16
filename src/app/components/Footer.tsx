
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-headline font-bold text-primary">TravelBharat</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Explore the rich tapestry of Indian heritage, nature, and adventure. Your comprehensive digital guide to Incredible India.
            </p>
            <div className="flex gap-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="font-headline font-bold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/states" className="hover:text-primary transition-colors">Browse States</Link></li>
              <li><Link href="/destinations" className="hover:text-primary transition-colors">Top Destinations</Link></li>
              <li><Link href="/heritage" className="hover:text-primary transition-colors">Heritage Sites</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About TravelBharat</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-4 text-foreground">Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/destinations?category=Heritage" className="hover:text-primary transition-colors">Heritage</Link></li>
              <li><Link href="/destinations?category=Nature" className="hover:text-primary transition-colors">Nature</Link></li>
              <li><Link href="/destinations?category=Adventure" className="hover:text-primary transition-colors">Adventure</Link></li>
              <li><Link href="/destinations?category=Religious" className="hover:text-primary transition-colors">Religious</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-4 text-foreground">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} TravelBharat. Proudly showcasing Incredible India.</p>
        </div>
      </div>
    </footer>
  );
}
