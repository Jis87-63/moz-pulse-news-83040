import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !message || rating === 0) {
      toast.error("Por favor, preencha todos os campos e selecione uma avaliação");
      return;
    }

    // Aqui você pode adicionar a lógica para enviar o email
    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    
    // Limpar formulário
    setEmail("");
    setMessage("");
    setRating(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent cosmic-gradient mb-4">
              Entre em Contato
            </h1>
            <p className="text-muted-foreground text-lg">
              Envie-nos sua mensagem e avalie sua experiência
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in glass-card p-8 rounded-xl">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                E-mail
              </label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-secondary/50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Mensagem
              </label>
              <Textarea
                id="message"
                placeholder="Digite sua mensagem aqui..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                className="bg-secondary/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium block">
                Avaliação do Site
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="smooth-transition hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoveredRating || rating)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full cosmic-gradient text-white font-semibold"
            >
              Enviar Mensagem
            </Button>
          </form>

          <div className="mt-8 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Ou entre em contato diretamente:
            </p>
            <a
              href="mailto:Opais@muskdev.com"
              className="text-primary hover:underline font-medium"
            >
              Opais@muskdev.com
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
