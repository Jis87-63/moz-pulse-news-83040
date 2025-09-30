import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-hidden animate-fade-in">
      <div className="absolute inset-0 cosmic-gradient opacity-20" />
      
      <div className="relative h-full flex flex-col items-center justify-center px-4">
        {/* Logo e marca */}
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          {/* Logo minimalista */}
          <div className="relative">
            <div className="w-20 h-20 mx-auto">
              <div className="absolute inset-0 cosmic-gradient rounded-2xl blur-xl opacity-60 animate-pulse" />
              <div className="relative w-full h-full rounded-2xl cosmic-gradient flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Título */}
          <div className="space-y-3">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent cosmic-gradient">
                O País
              </span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-light">
              Carregando as últimas notícias de Moçambique
            </p>
          </div>

          {/* Barra de progresso estilo Grok */}
          <div className="w-full max-w-xs mx-auto space-y-2">
            <div className="relative h-1 bg-border rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 cosmic-gradient rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground font-mono text-center">
              {progress}%
            </p>
          </div>
        </div>

        {/* Indicador animado no rodapé */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0ms' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: '200ms' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: '400ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
};
