import FeatherAnimation from "@/components/FeatherAnimation";
import { Button } from "@/components/ui/button";
const Index = () => {
  return <div className="min-h-screen flex-col bg-background px-6 py-16 flex items-center justify-center">
      {/* Logo with feather animation */}
      <div className="mb-24">
        <FeatherAnimation />
      </div>

      {/* Hero headline */}
      <h1 className="mb-8 text-center font-display text-7xl font-medium leading-tight tracking-tight text-foreground md:text-8xl lg:text-9xl">
        A new way
        <br />
        to print
      </h1>

      {/* Subtext */}
      <p className="mb-12 text-center font-body text-lg text-muted-foreground">
        Coming Soon. In the meantime...
      </p>

      {/* CTA Button */}
      <Button variant="outline" className="rounded-full border-foreground px-10 py-6 font-body text-base font-medium text-foreground hover:bg-foreground hover:text-background">
        Say Hello
      </Button>
    </div>;
};
export default Index;