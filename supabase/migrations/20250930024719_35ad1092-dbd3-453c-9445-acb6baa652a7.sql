-- Criar tabela para armazenar notícias
CREATE TABLE IF NOT EXISTS public.news_archive (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL,
  read_time INTEGER NOT NULL,
  video_url TEXT,
  audio_url TEXT,
  source TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índice para busca rápida por data
CREATE INDEX IF NOT EXISTS idx_news_published_at ON public.news_archive(published_at DESC);

-- Criar índice para busca por categoria
CREATE INDEX IF NOT EXISTS idx_news_category ON public.news_archive(category);

-- Criar índice para busca de texto
CREATE INDEX IF NOT EXISTS idx_news_search ON public.news_archive USING gin(to_tsvector('portuguese', title || ' ' || summary || ' ' || content));

-- Habilitar RLS
ALTER TABLE public.news_archive ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública
CREATE POLICY "Permitir leitura pública de notícias"
  ON public.news_archive
  FOR SELECT
  USING (true);

-- Função para atualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar timestamp automaticamente
CREATE TRIGGER update_news_archive_updated_at
  BEFORE UPDATE ON public.news_archive
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();