import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background text-foreground">
      <h1 className="text-6xl text-hero">
        Hello, World
      </h1>
      <p className="text-muted-foreground text-lg">
        studio-cms is up and running.
      </p>
      <Button>Get Started</Button>
    </main>
  );
}
