import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sprout, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "te">("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "te" : "en");
  };

  const navItems = [
    { label: language === "en" ? "Home" : "హోమ్", path: "/" },
    { label: language === "en" ? "Lessons" : "పాఠాలు", path: "/lessons" },
    { label: language === "en" ? "Dashboard" : "డాష్‌బోర్డ్", path: "/dashboard" },
    { label: language === "en" ? "Support" : "మద్దతు", path: "/support" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Sprout className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
            <span className="text-xl font-bold text-foreground">
              {language === "en" ? "Smart Farming" : "స్మార్ట్ ఫార్మింగ్"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="gap-2"
            >
              <Globe className="h-4 w-4" />
              {language === "en" ? "తెలుగు" : "English"}
            </Button>
            <Link to="/auth">
              <Button size="sm">{language === "en" ? "Login" : "లాగిన్"}</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="w-full justify-start gap-2"
            >
              <Globe className="h-4 w-4" />
              {language === "en" ? "తెలుగు" : "English"}
            </Button>
            <Link to="/auth" onClick={() => setIsOpen(false)}>
              <Button size="sm" className="w-full">
                {language === "en" ? "Login" : "లాగిన్"}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
