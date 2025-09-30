import { useState, useEffect } from "react";
import { CookieConsent } from "@/components/CookieConsent";
import { LoadingScreen } from "@/components/LoadingScreen";
import { IntroScreen } from "@/components/IntroScreen";
import { Header } from "@/components/Header";
import { NewsCard } from "@/components/NewsCard";
import { NewsArticle } from "@/types/news";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [allNews, setAllNews] = useState<NewsArticle[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [isLoadingNews, setIsLoadingNews] = useState(true);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");
    
    if (cookieConsent === "accepted") {
      if (!hasSeenIntro) {
        setShowIntro(true);
      } else {
        setShowLoading(true);
        fetchRSSNews();
      }
    } else {
      setIsReady(false);
    }
  }, []);

  useEffect(() => {
    if (selectedCategory === "Todas") {
      setFilteredNews(allNews);
    } else {
      setFilteredNews(allNews.filter((news) => news.category === selectedCategory));
    }
  }, [selectedCategory, allNews]);

  const fetchRSSNews = async () => {
    try {
      setIsLoadingNews(true);
      
      // Tentar buscar do cache primeiro
      const cachedNews = localStorage.getItem('rss-news');
      const cacheTime = localStorage.getItem('rss-news-time');
      const now = Date.now();
      
      // Cache válido por 30 minutos
      if (cachedNews && cacheTime && (now - parseInt(cacheTime)) < 30 * 60 * 1000) {
        const news = JSON.parse(cachedNews);
        setAllNews(news);
        setFilteredNews(news);
        setIsLoadingNews(false);
        return;
      }

      // Buscar do RSS
      const { data, error } = await supabase.functions.invoke('fetch-rss-news');

      if (error) {
        console.error('Error fetching RSS news:', error);
        toast.error('Erro ao carregar notícias. Usando dados do cache.');
        
        // Usar cache mesmo se expirado
        if (cachedNews) {
          const news = JSON.parse(cachedNews);
          setAllNews(news);
          setFilteredNews(news);
        }
      } else if (data?.news && data.news.length > 0) {
        setAllNews(data.news);
        setFilteredNews(data.news);
        
        // Salvar no cache
        localStorage.setItem('rss-news', JSON.stringify(data.news));
        localStorage.setItem('rss-news-time', now.toString());
        
        toast.success(`${data.news.length} notícias carregadas com sucesso!`);
      }
    } catch (error) {
      console.error('Error in fetchRSSNews:', error);
      toast.error('Erro ao carregar notícias');
    } finally {
      setIsLoadingNews(false);
    }
  };

  const handleIntroComplete = () => {
    localStorage.setItem("hasSeenIntro", "true");
    setShowIntro(false);
    setShowLoading(true);
    fetchRSSNews();
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setIsReady(true);
  };

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setFilteredNews(selectedCategory === "Todas" ? allNews : allNews.filter(n => n.category === selectedCategory));
    } else {
      const searchResults = allNews.filter(
        (news) =>
          news.title.toLowerCase().includes(query.toLowerCase()) ||
          news.summary.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNews(searchResults);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (showIntro) {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  if (showLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (!isReady) {
    return <CookieConsent />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} onCategoryChange={handleCategoryChange} />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center space-y-4 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent cosmic-gradient">
            Notícias de Moçambique
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fique informado com as últimas notícias de política, economia, desporto e muito mais
          </p>
        </section>

        {/* Google AdSense - Anúncio Superior */}
        <div className="my-8 flex justify-center">
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-2569329537599023"
               data-ad-slot="1234567890"
               data-ad-format="horizontal"
               data-full-width-responsive="true"></ins>
        </div>

        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {selectedCategory === "Todas" ? "Últimas Notícias" : selectedCategory}
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredNews.length} {filteredNews.length === 1 ? "notícia" : "notícias"}
            </span>
          </div>

          {isLoadingNews ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                <p className="text-muted-foreground">A carregar notícias do RSS...</p>
              </div>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                Nenhuma notícia encontrada
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((article, index) => (
                <div
                  key={article.id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <NewsCard article={article} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Google AdSense - Anúncio Inferior */}
        <div className="my-8 flex justify-center">
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-2569329537599023"
               data-ad-slot="0987654321"
               data-ad-format="horizontal"
               data-full-width-responsive="true"></ins>
        </div>
      </main>

      <footer className="border-t border-border/40 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              © 2024 O País. Todos os direitos reservados.
            </p>
            <div className="flex justify-center gap-6 text-sm flex-wrap">
              <a href="/sobre" className="text-muted-foreground hover:text-primary smooth-transition">
                Sobre
              </a>
              <a href="/contacto" className="text-muted-foreground hover:text-primary smooth-transition">
                Contacto
              </a>
              <a href="/privacidade" className="text-muted-foreground hover:text-primary smooth-transition">
                Política de Privacidade
              </a>
              <a href="/termos" className="text-muted-foreground hover:text-primary smooth-transition">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
