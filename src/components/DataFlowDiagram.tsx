import { useState } from "react";
import { User, FileText, Database, CheckCircle, ArrowDown, Info, Play, RotateCcw, AlertCircle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Step = {
  id: number;
  icon: typeof User;
  title: string;
  subtitle: string;
  description: string;
  detailedExplanation: string;
  code: string;
  color: string;
  tip: string;
};

const steps: Step[] = [
  {
    id: 1,
    icon: User,
    title: "1. Input Utente",
    subtitle: "L'utente compila il form",
    description: "L'utente inserisce i suoi dati nei campi del form (nome, email, messaggio)",
    detailedExplanation: "Quando l'utente digita nei campi, React aggiorna lo 'stato' (state) del componente. useState() è un Hook di React che permette di memorizzare e aggiornare valori. Ogni volta che l'utente modifica un campo, la funzione setFormData aggiorna lo stato.",
    code: `// useState è un "Hook" di React
// Permette di memorizzare dati che cambiano
const [formData, setFormData] = useState({
  nome: "",      // Inizialmente vuoto
  email: "",     // Inizialmente vuoto
  messaggio: ""  // Inizialmente vuoto
});

// Quando l'utente digita, aggiorniamo lo stato
const handleChange = (campo, valore) => {
  setFormData(prev => ({
    ...prev,           // Mantieni gli altri campi
    [campo]: valore    // Aggiorna solo questo campo
  }));
};`,
    color: "text-primary",
    tip: "💡 useState è fondamentale in React: permette ai componenti di 'ricordare' informazioni tra un render e l'altro.",
  },
  {
    id: 2,
    icon: FileText,
    title: "2. Validazione",
    subtitle: "Controllo dei dati inseriti",
    description: "Prima di salvare, controlliamo che i dati siano corretti: email valida? Nome presente?",
    detailedExplanation: "La validazione è CRITICA per la sicurezza e la qualità dei dati. Controlliamo: 1) Che i campi obbligatori non siano vuoti, 2) Che l'email abbia un formato valido (con @), 3) Che i dati rispettino eventuali vincoli (lunghezza minima, caratteri permessi). Se la validazione fallisce, mostriamo errori all'utente.",
    code: `// Funzione che valida tutti i campi
const validateForm = () => {
  const errors = {};  // Oggetto per raccogliere errori
  
  // Controllo nome: deve esistere e avere almeno 2 caratteri
  if (!formData.nome || formData.nome.length < 2) {
    errors.nome = "Il nome deve avere almeno 2 caratteri";
  }
  
  // Controllo email: deve contenere @ e un dominio
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    errors.email = "Inserisci un'email valida";
  }
  
  // Se ci sono errori, ritorna false
  return Object.keys(errors).length === 0;
};`,
    color: "text-secondary",
    tip: "⚠️ Mai fidarsi dei dati utente! La validazione previene errori, spam e problemi di sicurezza.",
  },
  {
    id: 3,
    icon: Database,
    title: "3. Salvataggio",
    subtitle: "Persistenza nel 'database'",
    description: "I dati validati vengono salvati. Qui usiamo localStorage, in produzione useresti un vero database.",
    detailedExplanation: "localStorage è un'API del browser che permette di salvare dati in modo persistente (rimangono anche chiudendo il browser). I dati sono salvati come stringhe, quindi usiamo JSON.stringify() per convertire oggetti in stringhe e JSON.parse() per riconvertirli. In un'app reale, qui faresti una chiamata API al backend.",
    code: `// Funzione per salvare il lead
const saveLead = (data) => {
  // 1. Recupera i lead già salvati (o array vuoto)
  const leadsEsistenti = JSON.parse(
    localStorage.getItem('leads') || '[]'
  );
  
  // 2. Crea il nuovo lead con metadati
  const nuovoLead = {
    ...data,                              // Dati del form
    id: Date.now(),                       // ID univoco (timestamp)
    dataCreazione: new Date().toISOString() // Quando è stato creato
  };
  
  // 3. Aggiungi alla lista
  leadsEsistenti.push(nuovoLead);
  
  // 4. Salva tutto nel localStorage
  localStorage.setItem('leads', JSON.stringify(leadsEsistenti));
  
  return nuovoLead;  // Ritorna il lead creato
};`,
    color: "text-accent",
    tip: "🗄️ localStorage ha un limite di ~5MB. Per dati più grandi o multi-utente, usa un database come Supabase o Firebase.",
  },
  {
    id: 4,
    icon: CheckCircle,
    title: "4. Feedback",
    subtitle: "Conferma all'utente",
    description: "L'utente riceve conferma visiva che l'operazione è andata a buon fine. UX fondamentale!",
    detailedExplanation: "Il feedback è essenziale per una buona User Experience (UX). L'utente deve sempre sapere cosa sta succedendo. Mostriamo: 1) Un messaggio di successo (toast notification), 2) Resettiamo il form per permettere nuovi inserimenti, 3) Eventualmente aggiorniamo la UI per mostrare il nuovo lead. Senza feedback, l'utente non sa se l'azione è riuscita!",
    code: `// Dopo il salvataggio, diamo feedback
const handleSubmitSuccess = () => {
  // 1. Mostra notifica di successo (toast)
  toast({
    title: "✅ Lead salvato con successo!",
    description: "I tuoi dati sono stati registrati.",
    variant: "success"
  });
  
  // 2. Resetta il form (pulisci i campi)
  setFormData({
    nome: "",
    email: "",
    messaggio: ""
  });
  
  // 3. Opzionale: aggiorna lista lead visibile
  refreshLeadsList();
  
  // 4. Opzionale: analytics/tracking
  trackEvent('lead_captured', { source: 'contact_form' });
};`,
    color: "text-green-500",
    tip: "✨ Una buona UX aumenta le conversioni! L'utente soddisfatto è più propenso a tornare e consigliare.",
  },
];

const DataFlowDiagram = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAnimation = () => {
    setIsPlaying(true);
    setActiveStep(0);
    
    steps.forEach((_, index) => {
      setTimeout(() => {
        setActiveStep(index + 1);
        if (index === steps.length - 1) {
          setTimeout(() => setIsPlaying(false), 1000);
        }
      }, (index + 1) * 1500);
    });
  };

  const reset = () => {
    setActiveStep(0);
    setIsPlaying(false);
  };

  const goToStep = (stepId: number) => {
    if (!isPlaying) {
      setActiveStep(stepId);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="educational-badge mb-4 inline-flex">
            <Info className="w-3.5 h-3.5" />
            Diagramma Interattivo
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Il Flusso dei <span className="gradient-text">Dati</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            Segui passo-passo come i dati viaggiano dal form al "database"
          </p>
        </div>

        {/* Explanation card */}
        <Card className="max-w-3xl mx-auto mb-8 border-2 border-dashed border-accent/30">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-muted-foreground text-sm">
                  <strong>Come usare questo diagramma:</strong> Clicca "Avvia Animazione" per vedere il flusso completo, 
                  oppure clicca sui singoli step per esplorare ogni fase in dettaglio. 
                  Ogni step mostra il codice reale che viene eseguito!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="flex gap-4 justify-center mb-12">
          <Button 
            onClick={playAnimation} 
            disabled={isPlaying}
            className="gradient-bg"
            size="lg"
          >
            <Play className="w-4 h-4 mr-2" />
            Avvia Animazione
          </Button>
          <Button variant="outline" onClick={reset} size="lg">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => goToStep(step.id)}
              disabled={isPlaying}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                activeStep >= step.id 
                  ? "gradient-bg text-white scale-110" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              } ${!isPlaying && "cursor-pointer"}`}
            >
              {step.id}
            </button>
          ))}
        </div>

        {/* Flow diagram */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            {steps.map((step, index) => (
              <div key={step.id} className="w-full">
                {/* Step card */}
                <Card 
                  className={`transition-all duration-500 border-2 cursor-pointer ${
                    activeStep >= step.id 
                      ? "border-primary shadow-xl scale-100 opacity-100" 
                      : "border-transparent opacity-40 scale-95 hover:opacity-60"
                  }`}
                  onClick={() => goToStep(step.id)}
                >
                  <CardContent className="p-6">
                    {/* Header row */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                        activeStep >= step.id ? "gradient-bg" : "bg-muted"
                      }`}>
                        <step.icon className={`w-7 h-7 ${activeStep >= step.id ? "text-white" : "text-muted-foreground"}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold text-xl ${step.color}`}>{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.subtitle}</p>
                      </div>
                      {activeStep >= step.id && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                    </div>

                    {/* Expanded content when active */}
                    {activeStep >= step.id && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        {/* Description */}
                        <p className="text-muted-foreground mb-4">
                          {step.description}
                        </p>

                        {/* Detailed explanation */}
                        <div className="p-4 rounded-xl bg-muted/50 mb-4">
                          <div className="flex items-start gap-2 mb-2">
                            <AlertCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <span className="font-semibold text-sm">Spiegazione dettagliata:</span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {step.detailedExplanation}
                          </p>
                        </div>

                        {/* Code */}
                        <div className="mb-4">
                          <div className="code-block text-xs overflow-x-auto">
                            <pre>{step.code}</pre>
                          </div>
                        </div>

                        {/* Tip */}
                        <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
                          <span className="text-sm">{step.tip}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-3">
                    <div className={`transition-all duration-500 ${
                      activeStep > step.id ? "opacity-100" : "opacity-20"
                    }`}>
                      <ArrowDown className="w-8 h-8 text-primary animate-bounce" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Completion message */}
        {activeStep === steps.length && (
          <div className="text-center mt-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-bg text-white font-semibold mb-4">
              <CheckCircle className="w-5 h-5" />
              Flusso Completato!
            </div>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Ora hai capito come i dati viaggiano dal form al database. 
              Scorri in basso per provare tu stesso il form e vedere i lead salvati!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DataFlowDiagram;
