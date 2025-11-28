import { useState } from "react";
import RaffleSetup from "@/components/RaffleSetup";
import RaffleWheel from "@/components/RaffleWheel";
import VemKitemLogo from "@/assets/VemKitemlogo.png";

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
          <div className="inline-flex items-center justify-center mb-4">
            <img src={VemKitemLogo} alt="VemKitem Logo" className="h-16 md:h-20" />
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
