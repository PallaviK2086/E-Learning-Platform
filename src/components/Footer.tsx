import { Mail, Phone, MapPin, Facebook, Twitter, Youtube, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Quick Links */}
<div className="text-center mx-auto">
  <h3 className="text-lg font-bold text-foreground mb-4">Quick Links</h3>
  <ul className="space-y-2">
    <li>
      <a href="/lessons" className="text-sm text-muted-foreground hover:text-primary transition-colors">
        Browse Lessons
      </a>
    </li>
    <li>
      <a href="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
        My Dashboard
      </a>
    </li>
    <li>
      <a href="/support" className="text-sm text-muted-foreground hover:text-primary transition-colors">
        Get Support
      </a>
    </li>
  </ul>
</div>

        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 E-learning Platform. Under Community Sevice project.</p>
        </div>
      </div>
    </footer>
  );
};
