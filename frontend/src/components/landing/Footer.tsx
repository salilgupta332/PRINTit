const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                P
              </div>
              <span className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                Print<span className="text-primary">IT</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              India's trusted academic printing & assignment support platform for students and educators.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Services", "About Us", "Contact"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(" ", "")}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Services</h4>
            <ul className="space-y-2">
              {["Printing", "Assignments", "Projects", "Question Papers"].map((s) => (
                <li key={s}>
                  <span className="text-sm text-muted-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>📞 +91 XXXXX XXXXX</li>
              <li>📧 hello@printit.in</li>
              <li>📍 New Delhi, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/50 pt-6 text-center text-xs text-muted-foreground">
          © 2026 PrintIT. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
