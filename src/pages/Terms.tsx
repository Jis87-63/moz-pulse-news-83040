import { Header } from "@/components/Header";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent cosmic-gradient mb-4">
              Termos de Uso
            </h1>
            <p className="text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-PT')}
            </p>
          </div>

          <div className="space-y-8 animate-fade-in glass-card p-8 rounded-xl">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Aceitação dos Termos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ao acessar e usar o site O País, você concorda em cumprir e estar vinculado aos seguintes 
                termos e condições de uso. Se você não concordar com qualquer parte destes termos, não deve 
                usar nosso site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Uso do Conteúdo</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                O conteúdo publicado em O País é fornecido apenas para fins informativos. Você concorda em:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Não reproduzir, distribuir ou modificar o conteúdo sem autorização prévia</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Não usar o site para fins ilegais ou não autorizados</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Respeitar os direitos autorais e propriedade intelectual</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Propriedade Intelectual</h2>
              <p className="text-muted-foreground leading-relaxed">
                Todo o conteúdo, incluindo textos, gráficos, logotipos e imagens, é propriedade de O País 
                ou de seus fornecedores de conteúdo e está protegido por leis de direitos autorais.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                Embora nos esforcemos para fornecer informações precisas e atualizadas, não garantimos a 
                precisão, completude ou atualidade do conteúdo. O uso das informações é por sua própria 
                conta e risco.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Links Externos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nosso site pode conter links para sites externos. Não somos responsáveis pelo conteúdo ou 
                práticas de privacidade desses sites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Modificações dos Termos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão 
                em vigor imediatamente após a publicação no site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Contato</h2>
              <p className="text-muted-foreground leading-relaxed">
                Para questões relacionadas a estes Termos de Uso, entre em contato conosco em: 
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
