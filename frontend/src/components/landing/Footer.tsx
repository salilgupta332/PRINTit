import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-accent text-accent-foreground py-16 dark:bg-muted/30 dark:text-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="font-display font-bold text-primary-foreground text-sm">P</span>
              </div>
              <span className="font-display font-bold text-xl">
                PRINT<span className="text-primary">it</span>
              </span>
            </Link>
            <p className="text-sm text-accent-foreground/60 leading-relaxed">
              India's smartest on-demand document printing & delivery platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-accent-foreground/60">
              <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-accent-foreground/60">
              <li><a href="#" className="hover:text-primary transition-colors">Notes Printing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Assignment Support</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Official Documents</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Bulk Printing</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-accent-foreground/60">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                support@printit.in
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                New Delhi, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-accent-foreground/10 dark:border-border mt-12 pt-8 text-center text-sm text-accent-foreground/40 dark:text-muted-foreground">
          © {new Date().getFullYear()} PRINTit. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
