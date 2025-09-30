import { Search, Menu, Newspaper, Mail, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onSearch?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
}

export const Header = ({ onSearch, onCategoryChange }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const categories = [
    "Todas",
    "Política",
    "Economia",
    "Desporto",
    "Sociedade",
    "Cultura",
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 group"
          >
            <div className="p-2 cosmic-gradient rounded-lg glow-effect">
              <Newspaper className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent cosmic-gradient">
              O País
            </span>
          </button>

          <nav className="hidden md:flex items-center space-x-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange?.(category)}
                className="text-sm font-medium text-muted-foreground hover:text-primary smooth-transition hover:scale-105"
              >
                {category}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Contatos - Desktop */}
            <div className="hidden lg:flex items-center space-x-3 text-sm text-muted-foreground">
              <a
                href="mailto:Opais@muskdev.com"
                className="flex items-center gap-1.5 hover:text-primary smooth-transition"
                title="Email"
              >
                <Mail className="h-4 w-4" />
                <span className="hidden xl:inline">Opais@muskdev.com</span>
              </a>
              <span className="text-border">|</span>
              <a
                href="https://www.facebook.com/profile.php?id=61579379653310"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-primary smooth-transition"
                title="Facebook"
              >
                <Facebook className="h-4 w-4" />
                <span className="hidden xl:inline">Facebook</span>
              </a>
            </div>

            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Pesquisar notícias..."
                  className="w-48 lg:w-64 pl-10 bg-secondary/50 border-border/50 focus:border-primary smooth-transition"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 py-4 animate-fade-in space-y-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Pesquisar notícias..."
                  className="w-full pl-10 bg-secondary/50 border-border/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            <nav className="flex flex-col space-y-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    onCategoryChange?.(category);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-sm font-medium text-muted-foreground hover:text-primary smooth-transition"
                >
                  {category}
                </button>
              ))}
            </nav>

            {/* Contatos - Mobile */}
            <div className="flex flex-col space-y-3 pt-4 border-t border-border/40">
              <a
                href="mailto:Opais@muskdev.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary smooth-transition"
              >
                <Mail className="h-4 w-4" />
                Opais@muskdev.com
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61579379653310"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary smooth-transition"
              >
                <Facebook className="h-4 w-4" />
                Página no Facebook
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
