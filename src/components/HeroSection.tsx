import { ArrowDown, Sparkles, Code2, Lightbulb, Info, Target, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToLearn = () => {
    document.getElementById("learn-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 animate-float">
        <div className="p-3 rounded-xl bg-card shadow-lg border">
          <Code2 className="w-6 h-6 text-primary" />
        </div>
      </div>
      <div className="absolute top-1/3 right-1/4 animate-float" style={{ animationDelay: "2s" }}>
        <div className="p-3 rounded-xl bg-card shadow-lg border">
          <Lightbulb className="w-6 h-6 text-secondary" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="educational-badge mb-6 inline-flex">
            <Sparkles className="w-3.5 h-3.5" />
            Progetto Didattico Frontend
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Impara a Costruire{" "}
            <span className="gradient-text">Landing Page</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Un progetto educativo per capire come funzionano le landing page orientate al marketing, 
            dalla <strong>raccolta lead</strong> alla <strong>gestione dati</strong>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="gradient-bg text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              onClick={scrollToForm}
            >
              Prova il Form
              <ArrowDown className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 border-2 hover:bg-muted transition-all"
              onClick={scrollToLearn}
            >
              Scopri Come Funziona
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Concetti Chiave</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">100%</div>
              <div className="text-sm text-muted-foreground">Frontend</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">∞</div>
              <div className="text-sm text-muted-foreground">Possibilità</div>
            </div>
          </div>
        </div>

        {/* Educational explanation card */}
        <Card className="max-w-4xl mx-auto border-2 border-dashed border-primary/30 bg-card/80 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                <Info className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  🎓 Cos'è una Landing Page?
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Una <strong>landing page</strong> (pagina di atterraggio) è una pagina web progettata con un unico obiettivo: 
                  <strong> convertire i visitatori in lead o clienti</strong>. A differenza di un sito web completo, 
                  una landing page è focalizzata su una singola azione che vuoi che l'utente compia.
                </p>
                
                <div className="grid sm:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                    <Target className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-sm">Obiettivo Unico</div>
                      <div className="text-xs text-muted-foreground">Una sola azione da compiere</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                    <Users className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-sm">Lead Generation</div>
                      <div className="text-xs text-muted-foreground">Raccolta contatti interessati</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                    <TrendingUp className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-sm">Conversione</div>
                      <div className="text-xs text-muted-foreground">Trasforma visitatori in clienti</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
