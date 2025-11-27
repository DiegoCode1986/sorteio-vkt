import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings2 } from "lucide-react";

interface RaffleSetupProps {
  onStart: (count: number) => void;
}

const RaffleSetup = ({ onStart }: RaffleSetupProps) => {
  const [numberCount, setNumberCount] = useState<string>("50");

  const handleStart = () => {
    const count = parseInt(numberCount);
    if (count >= 2 && count <= 1000) {
      onStart(count);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg animate-fade-in">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Settings2 className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Configurar Sorteio</CardTitle>
        <CardDescription>
          Defina a quantidade de números para o sorteio
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="numberCount">Quantidade de números (2-1000)</Label>
          <Input
            id="numberCount"
            type="number"
            min="2"
            max="1000"
            value={numberCount}
            onChange={(e) => setNumberCount(e.target.value)}
            placeholder="Ex: 50"
            className="text-center text-lg"
          />
          <p className="text-sm text-muted-foreground text-center">
            Serão gerados números de 1 até {numberCount || "0"}
          </p>
        </div>
        <Button 
          onClick={handleStart} 
          className="w-full text-lg py-6"
          disabled={!numberCount || parseInt(numberCount) < 2 || parseInt(numberCount) > 1000}
        >
          Iniciar Sorteio
        </Button>
      </CardContent>
    </Card>
  );
};

export default RaffleSetup;
