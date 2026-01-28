import { BookOpen, Database, Zap, ArrowRight, Code2, Eye, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const concepts = [
  {
    icon: Eye,
    title: "Hero Section",
    description: "La prima cosa che l'utente vede. Deve catturare l'attenzione e comunicare il valore in pochi secondi.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    code: `<section className="hero">
  <h1>Titolo Accattivante</h1>
  <p>Sottotitolo esplicativo</p>
  <Button>Call to Action</Button>
</section>`,
  },
  {
    icon: BookOpen,
    title: "Form di Contatto",
    description: "Il cuore della lead generation. Raccoglie dati degli utenti interessati al tuo prodotto/servizio.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    code: `<form onSubmit={handleSubmit}>
  <input name="email" type="email" />
  <input name="nome" type="text" />
  <button type="submit">
    Invia
  </button>
</form>`,
  },
  {
    icon: Database,
    title: "Gestione Dati",
    description: "I dati raccolti devono essere salvati. In produzione useresti un database, qui simuliamo con localStorage.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    code: `// Salvataggio lead
const saveLead = (data) => {
  const leads = getLeads();
  leads.push({...data, id: Date.now()});
  localStorage.setItem('leads', 
    JSON.stringify(leads)
  );
}`,
  },
];

const LearnSection = () => {
  return (
    <section id="learn-section" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="educational-badge mb-4 inline-flex">
            <Zap className="w-3.5 h-3.5" />
            Concetti Fondamentali
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Come Funziona una <span className="gradient-text">Landing Page</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Scopri i tre elementi essenziali che compongono ogni landing page di successo
          </p>
        </div>

        {/* Concepts grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {concepts.map((concept, index) => (
            <Card 
              key={concept.title} 
              className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
            >
              <CardContent className="p-6">
                {/* Step number */}
                <div className="absolute top-4 right-4 text-6xl font-bold text-muted/20">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${concept.bgColor} flex items-center justify-center mb-4`}>
                  <concept.icon className={`w-7 h-7 ${concept.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2">{concept.title}</h3>
                <p className="text-muted-foreground mb-4">{concept.description}</p>

                {/* Code preview */}
                <div className="code-block text-xs">
                  <pre>{concept.code}</pre>
                </div>

                {/* Arrow for flow */}
                {index < concepts.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-primary/30" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key points */}
        <div className="bg-card rounded-2xl p-8 border shadow-lg max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Code2 className="w-6 h-6 text-primary" />
            Punti Chiave da Ricordare
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Il form raccoglie i dati dell'utente",
              "I dati vengono validati prima dell'invio",
              "In produzione si usa un database reale",
              "Qui simuliamo con localStorage del browser",
              "L'UX deve essere semplice e intuitiva",
              "Il feedback all'utente è fondamentale",
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnSection;
