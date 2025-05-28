
"use client"; // <-- ADDED THIS DIRECTIVE

// src/app/page.tsx - Landing Page
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LogoIcon } from '@/components/icons/LogoIcon';
import { Sparkles, Palette, Rabbit, Rocket } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <LogoIcon className="h-7 w-7 text-primary" />
            <span className="font-bold text-lg tracking-tight">AutoSite</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="absolute inset-0 opacity-50 bg-grid-pattern-light dark:bg-grid-pattern-dark" style={{ maskImage: 'linear-gradient(to bottom, white, transparent)' }}></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              Launch Your <span className="text-primary">Stunning Portfolio</span> in Minutes
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              No code, no fuss. Just beautiful, customizable portfolio websites generated instantly. 
              Choose your theme, fill in your details, and shine online!
            </p>
            <Link href="/studio">
              <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-primary/30 transition-all duration-300 group">
                Create Your Portfolio Now <Rocket className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
             <div className="mt-16">
              <Image 
                src="https://placehold.co/800x450.png" 
                alt="AutoSite Studio Showcase" 
                width={800} 
                height={450} 
                className="rounded-xl shadow-2xl mx-auto border-4 border-primary/20"
                data-ai-hint="website portfolio showcase collage"
                priority
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-tight">Why Choose AutoSite Studio?</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6 bg-card rounded-xl shadow-lg border border-border transition-all hover:shadow-primary/20 hover:-translate-y-1">
                <Palette className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Multiple Themes</h3>
                <p className="text-muted-foreground text-sm">Pick from a variety of modern, elegant, and playful themes to match your style.</p>
              </div>
              <div className="p-6 bg-card rounded-xl shadow-lg border border-border transition-all hover:shadow-primary/20 hover:-translate-y-1">
                <Rabbit className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Effortless Customization</h3>
                <p className="text-muted-foreground text-sm">Easily input your details and watch your portfolio come to life. No coding required!</p>
              </div>
              <div className="p-6 bg-card rounded-xl shadow-lg border border-border transition-all hover:shadow-primary/20 hover:-translate-y-1">
                <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Instant Live Preview</h3>
                <p className="text-muted-foreground text-sm">See your changes in real-time before you even generate the code.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Ready to Build Your Dream Portfolio?</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Stop dreaming, start creating. Your professional online presence is just a few clicks away.
            </p>
            <Link href="/studio">
              <Button size="lg" variant="default" className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-primary/40 transition-all duration-300 group">
                Get Started for Free <Rocket className="ml-2 h-5 w-5 group-hover:animate-pulse" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40">
        <div className="container mx-auto p-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} AutoSite Studio. All Rights Reserved.
          <p className="text-xs mt-1">Powered by Websters</p>
        </div>
      </footer>
      <style jsx global>{`
        .bg-grid-pattern-light {
          background-image:
            linear-gradient(to right, hsl(var(--border)/0.4) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)/0.4) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .dark .bg-grid-pattern-dark {
          background-image:
            linear-gradient(to right, hsl(var(--border)/0.2) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)/0.2) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
}
