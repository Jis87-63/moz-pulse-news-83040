import { Header } from "@/components/Header";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent cosmic-gradient mb-4">
              Política de Privacidade
            </h1>
            <p className="text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-PT')}
            </p>
          </div>

          <div className="space-y-8 animate-fade-in glass-card p-8 rounded-xl">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Informações que Coletamos</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Coletamos informações que você nos fornece diretamente, incluindo:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Dados de navegação e preferências de leitura</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Informações de contato quando você nos envia mensagens</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Cookies para melhorar sua experiência de navegação</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Como Usamos Suas Informações</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Utilizamos as informações coletadas para:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Melhorar nosso serviço e personalizar sua experiência</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Responder suas mensagens e solicitações</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Analisar tendências e melhorar nosso conteúdo</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Utilizamos cookies para melhorar sua experiência de navegação. Você pode controlar o uso de 
                cookies através das configurações do seu navegador. Ao continuar usando nosso site, você 
                concorda com o uso de cookies conforme descrito nesta política.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Compartilhamento de Informações</h2>
              <p className="text-muted-foreground leading-relaxed">
                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto 
                quando necessário para fornecer nossos serviços ou quando exigido por lei.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Seus Direitos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Para exercer 
                esses direitos, entre em contato conosco através do email: Opais@muskdev.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Contato</h2>
              <p className="text-muted-foreground leading-relaxed">
                Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco em: 
                <a href="mailto:Opais@muskdev.com" className="text-primary hover:underline ml-1">
                  Opais@muskdev.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
