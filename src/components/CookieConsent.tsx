import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

export const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in">
      <Card className="max-w-7xl mx-auto p-4 md:p-6 bg-card/95 backdrop-blur-xl border-border/50">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1 space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              🍪 Cookies e Privacidade
            </h3>
            <p className="text-sm text-muted-foreground">
              Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{" "}
              <a href="#" className="text-primary hover:underline">
                Política de Privacidade
              </a>
              .
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              onClick={handleDecline}
              variant="outline"
              size="sm"
              className="flex-1 md:flex-none"
            >
              Recusar
            </Button>
            <Button
              onClick={handleAccept}
              size="sm"
              className="flex-1 md:flex-none cosmic-gradient text-white hover:opacity-90"
            >
              Aceitar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
