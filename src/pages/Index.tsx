import { useState } from "react";
import RaffleSetup from "@/components/RaffleSetup";
import RaffleWheel from "@/components/RaffleWheel";
import { Gift } from "lucide-react";

const Index = () => {
  const [totalNumbers, setTotalNumbers] = useState<number | null>(null);

  const handleStart = (count: number) => {
    setTotalNumbers(count);
  };

  const handleReset = () => {
    setTotalNumbers(null);
  };

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Gift className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Sorteador de Números
          </h1>
          <p className="text-muted-foreground text-lg">
            Sorteie brindes para os colaboradores de forma justa e divertida
          </p>
        </header>

        {/* Main Content */}
        <section>
          {totalNumbers === null ? (
            <RaffleSetup onStart={handleStart} />
          ) : (
            <RaffleWheel totalNumbers={totalNumbers} onReset={handleReset} />
          )}
        </section>
      </div>
    </main>
  );
};

export default Index;
