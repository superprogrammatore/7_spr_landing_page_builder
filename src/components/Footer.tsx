import { Heart, Github, BookOpen, Coffee } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Main content */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">
              Landing <span className="gradient-text">Builder</span>
            </h3>
            <p className="text-muted-foreground">
              Un progetto didattico per imparare il frontend orientato al marketing
            </p>
          </div>

          {/* Key takeaways */}
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 rounded-xl bg-muted/50">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-primary" />
              <h4 className="font-semibold mb-1">Cosa hai imparato</h4>
              <p className="text-sm text-muted-foreground">
                Hero, Form, Gestione dati, UX
              </p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/50">
              <Coffee className="w-6 h-6 mx-auto mb-2 text-secondary" />
              <h4 className="font-semibold mb-1">Stack Utilizzato</h4>
              <p className="text-sm text-muted-foreground">
                React, TypeScript, Tailwind
              </p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/50">
              <Github className="w-6 h-6 mx-auto mb-2 text-accent" />
              <h4 className="font-semibold mb-1">Prossimi Passi</h4>
              <p className="text-sm text-muted-foreground">
                Backend, Database, Deploy
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground border-t pt-6">
            <p className="flex items-center justify-center gap-1">
              Realizzato con <Heart className="w-4 h-4 text-destructive inline" /> per scopi didattici
            </p>
            <p className="mt-1">
              © {new Date().getFullYear()} Landing Builder - Progetto Educativo
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
