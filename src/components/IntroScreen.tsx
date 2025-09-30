import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Newspaper, Search, Volume2, Clock, ArrowRight } from "lucide-react";

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: <Newspaper className="w-16 h-16 text-primary" />,
      title: "Bem-vindo ao O País",
      description: "A sua fonte de notícias de Moçambique. Acesse as últimas notícias de política, economia, desporto e muito mais, tudo em tempo real."
    },
    {
      icon: <Search className="w-16 h-16 text-primary" />,
      title: "Pesquise e Filtre",
      description: "Use a barra de pesquisa para encontrar notícias específicas ou filtre por categoria para ver apenas o que interessa."
    },
    {
      icon: <Volume2 className="w-16 h-16 text-primary" />,
      title: "Ouça as Notícias",
      description: "Recurso de texto para voz integrado. Ouça qualquer notícia enquanto faz outras tarefas."
    },
    {
      icon: <Clock className="w-16 h-16 text-primary" />,
      title: "Sempre Atualizado",
      description: "As notícias são carregadas automaticamente de fontes confiáveis de Moçambique, mantendo você sempre informado em tempo real."
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <Card className="max-w-2xl w-full p-8 md:p-12 card-gradient border-primary/20 glow-effect">
        <div className="space-y-8">
          {/* Indicadores de progresso */}
          <div className="flex justify-center gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 bg-primary"
                    : "w-1.5 bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Conteúdo do slide */}
          <div className="text-center space-y-6 animate-fade-in" key={currentSlide}>
            <div className="flex justify-center">
              <div className="p-4 rounded-2xl cosmic-gradient/10 backdrop-blur-sm">
                {slides[currentSlide].icon}
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent cosmic-gradient">
                {slides[currentSlide].title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                {slides[currentSlide].description}
              </p>
            </div>
          </div>

          {/* Botões de navegação */}
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              Pular
            </Button>

            <Button
              onClick={handleNext}
              className="cosmic-gradient text-white hover:opacity-90 smooth-transition group"
              size="lg"
            >
              {currentSlide === slides.length - 1 ? "Começar" : "Próximo"}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Informações de contato */}
          {currentSlide === slides.length - 1 && (
            <div className="pt-6 border-t border-border/40 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Precisa de ajuda ou tem alguma sugestão?
              </p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <a
                  href="mailto:Opais@muskdev.com"
                  className="text-primary hover:underline"
                >
                  Opais@muskdev.com
                </a>
                <span className="text-muted-foreground">•</span>
                <a
                  href="https://www.facebook.com/profile.php?id=61579379653310"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Facebook
                </a>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
