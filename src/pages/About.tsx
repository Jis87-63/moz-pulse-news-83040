import { Header } from "@/components/Header";
import { Newspaper } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="p-4 cosmic-gradient rounded-xl glow-effect">
                <Newspaper className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent cosmic-gradient mb-4">
              Sobre O País
            </h1>
          </div>

          <div className="space-y-8 animate-fade-in glass-card p-8 rounded-xl">
            <section>
              <h2 className="text-2xl font-bold mb-4">Quem Somos</h2>
              <p className="text-muted-foreground leading-relaxed">
                O País é uma plataforma digital dedicada a fornecer notícias atualizadas e relevantes sobre Moçambique. 
                Nosso objetivo é manter você informado sobre política, economia, desporto, cultura e sociedade com 
                informações precisas e confiáveis de fontes credíveis.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Nossa Missão</h2>
              <p className="text-muted-foreground leading-relaxed">
                Democratizar o acesso à informação e promover o jornalismo de qualidade, conectando os moçambicanos 
                às notícias que importam. Acreditamos no poder da informação para transformar vidas e construir 
                uma sociedade mais informada e participativa.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Nossos Valores</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Transparência e credibilidade nas informações</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Compromisso com a verdade e ética jornalística</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Inovação e tecnologia para melhor servir nossos leitores</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Respeito pela diversidade de opiniões e perspectivas</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
