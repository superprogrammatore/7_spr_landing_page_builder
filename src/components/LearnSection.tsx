import { BookOpen, Database, Zap, ArrowRight, Code2, Eye, CheckCircle2, AlertTriangle, Lightbulb, FileCode } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const concepts = [
  {
    icon: Eye,
    title: "Hero Section",
    subtitle: "La Prima Impressione",
    description: "La prima cosa che l'utente vede. Deve catturare l'attenzione e comunicare il valore in pochi secondi.",
    whyImportant: "Hai solo 3-5 secondi per convincere un visitatore a restare. La hero section deve comunicare immediatamente cosa offri e perché è rilevante.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    elements: ["Titolo accattivante (H1)", "Sottotitolo esplicativo", "Call-to-Action (CTA)", "Immagine/Visual"],
    code: `// Struttura base di una Hero Section
<section className="hero">
  {/* Titolo principale - deve essere chiaro */}
  <h1>Titolo Accattivante</h1>
  
  {/* Sottotitolo - spiega il valore */}
  <p>Sottotitolo che spiega il beneficio</p>
  
  {/* CTA - l'azione che vuoi far compiere */}
  <Button onClick={handleClick}>
    Call to Action
  </Button>
</section>`,
  },
  {
    icon: BookOpen,
    title: "Form di Contatto",
    subtitle: "La Lead Generation",
    description: "Il cuore della lead generation. Raccoglie dati degli utenti interessati al tuo prodotto/servizio.",
    whyImportant: "Senza un form, non puoi raccogliere contatti. È il ponte tra un visitatore anonimo e un potenziale cliente con cui puoi comunicare.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    elements: ["Campo email (obbligatorio)", "Campo nome", "Campo messaggio/interesse", "Bottone di invio"],
    code: `// Form con gestione stato React
const [formData, setFormData] = useState({
  email: "",
  nome: "",
  messaggio: ""
});

const handleSubmit = (e) => {
  e.preventDefault();  // Previene il reload
  
  // 1. Valida i dati
  if (!isValid(formData)) return;
  
  // 2. Salva nel database
  saveLead(formData);
  
  // 3. Feedback all'utente
  showSuccess("Grazie!");
};`,
  },
  {
    icon: Database,
    title: "Gestione Dati",
    subtitle: "Il Backend (Simulato)",
    description: "I dati raccolti devono essere salvati. In produzione useresti un database, qui simuliamo con localStorage.",
    whyImportant: "I lead raccolti sono il valore della tua landing page. Devono essere salvati in modo sicuro e accessibile per le attività di marketing.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    elements: ["Validazione dati", "Salvataggio persistente", "ID univoco per ogni lead", "Timestamp di creazione"],
    code: `// Simulazione database con localStorage
const saveLead = (data) => {
  // Recupera lead esistenti
  const leads = JSON.parse(
    localStorage.getItem('leads') || '[]'
  );
  
  // Crea nuovo lead con metadati
  const nuovoLead = {
    ...data,
    id: Date.now(),        // ID univoco
    createdAt: new Date()  // Quando è stato creato
  };
  
  // Salva tutto
  leads.push(nuovoLead);
  localStorage.setItem('leads', JSON.stringify(leads));
};`,
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

        {/* Intro explanation */}
        <Card className="max-w-4xl mx-auto mb-12 border-2 border-dashed border-secondary/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-secondary/10 shrink-0">
                <Lightbulb className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">💡 Prima di iniziare: Il Flusso Base</h3>
                <p className="text-muted-foreground mb-4">
                  Una landing page funziona come un <strong>imbuto (funnel)</strong>: attira visitatori con la Hero, 
                  li convince con i contenuti, e li converte in lead attraverso il form. Ecco il flusso:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                  <span className="px-3 py-1.5 rounded-full bg-primary/20 text-primary font-medium">
                    1. Visitatore arriva
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <span className="px-3 py-1.5 rounded-full bg-primary/20 text-primary font-medium">
                    2. Legge Hero
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <span className="px-3 py-1.5 rounded-full bg-secondary/20 text-secondary font-medium">
                    3. Compila Form
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <span className="px-3 py-1.5 rounded-full bg-accent/20 text-accent font-medium">
                    4. Diventa Lead
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Concepts - detailed cards */}
        <div className="space-y-8 mb-16">
          {concepts.map((concept, index) => (
            <Card 
              key={concept.title} 
              className="max-w-5xl mx-auto overflow-hidden border-2 hover:border-primary/30 transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2">
                  {/* Left side - Explanation */}
                  <div className="p-8 border-b lg:border-b-0 lg:border-r border-border">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-xl ${concept.bgColor} flex items-center justify-center shrink-0`}>
                        <concept.icon className={`w-7 h-7 ${concept.color}`} />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground font-medium">
                          Passo {index + 1} di 3
                        </div>
                        <h3 className="text-2xl font-bold">{concept.title}</h3>
                        <p className={`text-sm ${concept.color} font-medium`}>{concept.subtitle}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {concept.description}
                    </p>

                    {/* Why important */}
                    <div className="p-4 rounded-xl bg-muted/50 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        <span className="font-semibold text-sm">Perché è importante?</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {concept.whyImportant}
                      </p>
                    </div>

                    {/* Elements list */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <FileCode className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-sm">Elementi chiave:</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {concept.elements.map((element, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                            <span className="text-muted-foreground">{element}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right side - Code */}
                  <div className="p-8 bg-muted/30">
                    <div className="flex items-center gap-2 mb-4">
                      <Code2 className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Esempio di Codice</span>
                    </div>
                    <div className="code-block text-xs overflow-x-auto">
                      <pre>{concept.code}</pre>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 italic">
                      💡 Studia questo codice: rappresenta la struttura base che userai nei tuoi progetti.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key points */}
        <div className="bg-card rounded-2xl p-8 border shadow-lg max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Code2 className="w-6 h-6 text-primary" />
            📝 Riepilogo: Cosa Devi Ricordare
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { text: "La Hero cattura l'attenzione in 3 secondi", icon: "👁️" },
              { text: "Il form raccoglie i dati essenziali dell'utente", icon: "📝" },
              { text: "I dati devono essere validati PRIMA di salvarli", icon: "✅" },
              { text: "In produzione si usa un database reale (es. Supabase)", icon: "🗄️" },
              { text: "localStorage è perfetto per prototipi e demo", icon: "💾" },
              { text: "Il feedback all'utente è FONDAMENTALE per la UX", icon: "💬" },
              { text: "Ogni lead deve avere un ID univoco e timestamp", icon: "🔑" },
              { text: "Meno campi = più conversioni (chiedi solo l'essenziale)", icon: "📊" },
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <span className="text-xl">{point.icon}</span>
                <span className="text-muted-foreground">{point.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnSection;
