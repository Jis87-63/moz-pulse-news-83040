import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// RSS feeds de Moçambique
const RSS_FEEDS = [
  'https://www.jornalnoticias.co.mz/feed/',
  'https://opais.co.mz/feed/',
  'http://www.aim.org.mz/rss.php',
];

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: number;
  source: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching RSS feeds...');
    
    // Inicializar Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const allNews: NewsItem[] = [];

    for (const feedUrl of RSS_FEEDS) {
      try {
        // Usar rss2json para converter RSS em JSON
        const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
        const response = await fetch(rss2jsonUrl);
        
        if (!response.ok) {
          console.error(`Failed to fetch ${feedUrl}: ${response.status}`);
          continue;
        }

        const data = await response.json();
        
        if (data.items && Array.isArray(data.items)) {
          const news = data.items.map((item: any, index: number) => {
            // Extrair imagem do conteúdo se disponível
            let imageUrl = item.thumbnail || item.enclosure?.link || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop';
            
            // Tentar extrair imagem do conteúdo HTML
            if (!item.thumbnail && item.description) {
              const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
              if (imgMatch) {
                imageUrl = imgMatch[1];
              }
            }

            // Limpar HTML do conteúdo
            const cleanContent = item.description ? item.description.replace(/<[^>]*>/g, '').trim() : item.title;
            const summary = cleanContent.substring(0, 200) + (cleanContent.length > 200 ? '...' : '');
            
            // Calcular tempo de leitura (250 palavras por minuto)
            const wordCount = cleanContent.split(' ').length;
            const readTime = Math.max(1, Math.ceil(wordCount / 250));

            // Determinar categoria baseada no conteúdo
            let category = 'Geral';
            const lowerTitle = item.title.toLowerCase();
            if (lowerTitle.includes('economia') || lowerTitle.includes('negócio')) category = 'Economia';
            else if (lowerTitle.includes('política') || lowerTitle.includes('governo')) category = 'Política';
            else if (lowerTitle.includes('desporto') || lowerTitle.includes('futebol')) category = 'Desporto';
            else if (lowerTitle.includes('cultura') || lowerTitle.includes('música')) category = 'Cultura';
            else if (lowerTitle.includes('saúde') || lowerTitle.includes('educação')) category = 'Sociedade';

            return {
              id: `${data.feed.title}-${index}-${Date.now()}`,
              title: item.title,
              summary,
              content: cleanContent,
              imageUrl,
              category,
              author: item.author || data.feed.title,
              publishedAt: item.pubDate,
              readTime,
              source: data.feed.title,
            };
          });

          allNews.push(...news);
        }
      } catch (error) {
        console.error(`Error processing feed ${feedUrl}:`, error);
      }
    }

    // Ordenar por data (mais recente primeiro)
    allNews.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    console.log(`Successfully fetched ${allNews.length} news articles`);

    // Salvar notícias no banco de dados
    if (allNews.length > 0) {
      try {
        const newsToInsert = allNews.map(news => ({
          id: news.id,
          title: news.title,
          summary: news.summary,
          content: news.content,
          image_url: news.imageUrl,
          category: news.category,
          author: news.author,
          published_at: news.publishedAt,
          read_time: news.readTime,
          video_url: null,
          audio_url: null,
          source: news.source
        }));

        // Usar upsert para evitar duplicatas
        const { error: dbError } = await supabase
          .from('news_archive')
          .upsert(newsToInsert, { onConflict: 'id' });

        if (dbError) {
          console.error('Error saving to database:', dbError);
        } else {
          console.log(`Saved ${newsToInsert.length} news articles to database`);
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
      }
    }

    return new Response(JSON.stringify({ news: allNews }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in fetch-rss-news:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage, news: [] }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
