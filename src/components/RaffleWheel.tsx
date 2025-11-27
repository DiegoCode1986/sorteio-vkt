import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shuffle, RotateCcw, Trophy, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface RaffleWheelProps {
  totalNumbers: number;
  onReset: () => void;
}

const RaffleWheel = ({ totalNumbers, onReset }: RaffleWheelProps) => {
  const [availableNumbers, setAvailableNumbers] = useState<number[]>([]);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const numbers = Array.from({ length: totalNumbers }, (_, i) => i + 1);
    setAvailableNumbers(numbers);
  }, [totalNumbers]);

  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f97316', '#fbbf24', '#fb923c', '#facc15'],
    });
  };

  const drawNumber = useCallback(() => {
    if (availableNumbers.length === 0 || isSpinning) return;

    setIsSpinning(true);
    setShowResult(false);

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const drawnNumber = availableNumbers[randomIndex];

    // Animate through random numbers
    let iterations = 0;
    const maxIterations = 20;
    const interval = setInterval(() => {
      const tempRandom = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
      setCurrentNumber(tempRandom);
      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        setCurrentNumber(drawnNumber);
        setAvailableNumbers(prev => prev.filter(n => n !== drawnNumber));
        setDrawnNumbers(prev => [...prev, drawnNumber]);
        setIsSpinning(false);
        setShowResult(true);
        fireConfetti();
      }
    }, 80);
  }, [availableNumbers, isSpinning]);

  const handleReset = () => {
    setAvailableNumbers(Array.from({ length: totalNumbers }, (_, i) => i + 1));
    setDrawnNumbers([]);
    setCurrentNumber(null);
    setShowResult(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Main Display */}
      <Card className="shadow-xl overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            {/* Number Display */}
            <div className={`
              relative mx-auto w-48 h-48 md:w-64 md:h-64 rounded-full 
              flex items-center justify-center
              bg-gradient-to-br from-primary/20 to-accent
              border-4 border-primary/30
              ${isSpinning ? 'animate-pulse-glow' : ''}
              ${showResult ? 'animate-scale-pop' : ''}
            `}>
              <span className={`
                text-6xl md:text-8xl font-bold text-primary
                ${isSpinning ? 'animate-number-spin' : ''}
              `}>
                {currentNumber ?? "?"}
              </span>
              {showResult && (
                <Sparkles className="absolute top-2 right-2 h-8 w-8 text-accent-foreground animate-bounce" />
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <p className="text-lg text-muted-foreground">
                {isSpinning ? "Sorteando..." : showResult ? "Número sorteado!" : "Clique para sortear"}
              </p>
              <div className="flex justify-center gap-4 text-sm">
                <Badge variant="secondary" className="px-4 py-1">
                  Restantes: {availableNumbers.length}
                </Badge>
                <Badge variant="outline" className="px-4 py-1 bg-primary/10 text-primary border-primary/20">
                  Sorteados: {drawnNumbers.length}
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                onClick={drawNumber}
                disabled={availableNumbers.length === 0 || isSpinning}
                size="lg"
                className="gap-2 text-lg px-8 py-6"
              >
                <Shuffle className="h-5 w-5" />
                {isSpinning ? "Sorteando..." : "Sortear Número"}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <RotateCcw className="h-5 w-5" />
                Reiniciar
              </Button>
              <Button
                onClick={onReset}
                variant="ghost"
                size="lg"
              >
                Novo Sorteio
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Drawn Numbers History */}
      {drawnNumbers.length > 0 && (
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Números Sorteados</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {drawnNumbers.map((num, index) => (
                <Badge
                  key={num}
                  className={`
                    px-4 py-2 text-base font-semibold
                    ${index === drawnNumbers.length - 1 ? 'bg-primary text-primary-foreground animate-scale-pop' : 'bg-secondary text-secondary-foreground'}
                  `}
                >
                  {num}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Numbers */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Números Disponíveis</h3>
            <Badge variant="secondary">{availableNumbers.length} restantes</Badge>
          </div>
          <div className="max-h-48 overflow-y-auto">
            <div className="flex flex-wrap gap-2">
              {availableNumbers.map((num) => (
                <Badge
                  key={num}
                  variant="outline"
                  className="px-3 py-1 text-sm"
                >
                  {num}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RaffleWheel;
