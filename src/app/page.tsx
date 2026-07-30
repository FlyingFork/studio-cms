import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-hero text-6xl">Hello, World</h1>
      <p className="text-muted-foreground text-lg">studio-cms is up and running.</p>
      <Button>Get Started</Button>
    </main>
  );
}
