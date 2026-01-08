import FeatherAnimation from "@/components/FeatherAnimation";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-6 py-16">
      {/* Logo with feather animation */}
      <div className="mb-24">
        <FeatherAnimation />
      </div>

      {/* Hero headline */}
      <h1 className="mb-8 text-center font-serif text-6xl font-normal leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl">
        A new way
        <br />
        to print
      </h1>

      {/* Subtext */}
      <p className="mb-12 text-center text-lg text-muted-foreground">
        Coming Soon. In the meantime...
      </p>

      {/* CTA Button */}
      <Button
        variant="outline"
        className="rounded-full border-foreground px-10 py-6 text-base font-medium text-foreground hover:bg-foreground hover:text-background"
      >
        Say Hello
      </Button>
    </div>
  );
};

export default Index;
