import { Clock, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NewsArticle } from "@/types/news";
import { useNavigate } from "react-router-dom";

interface NewsCardProps {
  article: NewsArticle;
}

export const NewsCard = ({ article }: NewsCardProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-PT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Card className="group overflow-hidden card-gradient border-border/50 hover:border-primary/50 smooth-transition hover:glow-effect animate-fade-in">
      <div className="relative overflow-hidden aspect-video">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
        />
        <div className="absolute top-3 left-3">
          <Badge className="cosmic-gradient text-white border-0">
            {article.category}
          </Badge>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary smooth-transition">
          {article.title}
        </h3>

        <p className="text-muted-foreground line-clamp-3 text-sm">
          {article.summary}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{article.readTime} min</span>
            </div>
          </div>
          <span>{formatDate(article.publishedAt)}</span>
        </div>

        <Button
          onClick={() => navigate(`/news/${article.id}`)}
          className="w-full cosmic-gradient text-white hover:opacity-90 smooth-transition"
        >
          Ver Detalhes
        </Button>
      </div>
    </Card>
  );
};
