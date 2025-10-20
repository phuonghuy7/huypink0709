import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ContactForm } from '@/components/contact-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section id="home" className="relative w-full h-[60vh] flex items-center justify-center text-center">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover -z-10 brightness-75"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="relative z-10 p-8 rounded-lg">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-white">
              Welcome to Minimal Website
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90">
              Your space for simplicity and clarity.
            </p>
          </div>
        </section>

        <section id="about" className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6">About Us</h2>
            <p className="text-lg text-muted-foreground mb-4">
              We believe in the power of simplicity. In a world full of noise, we provide a clean, uncluttered digital experience. Our mission is to focus on what truly matters: clear content and meaningful interaction.
            </p>
            <p className="text-lg text-muted-foreground">
              This website is a demonstration of that philosophy. Built with a minimalist aesthetic, it aims to be both beautiful and functional without overwhelming the senses.
            </p>
          </div>
        </section>

        <Separator className="my-8 max-w-sm mx-auto" />

        <section id="contact" className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card className="shadow-lg border-2 border-primary/10">
              <CardHeader>
                <CardTitle className="text-center text-3xl md:text-4xl font-headline">Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground mb-6">Have a question or want to work together? Drop us a line.</p>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
