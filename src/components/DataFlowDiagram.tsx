import { useState } from "react";
import { User, FileText, Database, CheckCircle, ArrowDown, Info, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Step = {
  id: number;
  icon: typeof User;
  title: string;
  description: string;
  code: string;
  color: string;
};

const steps: Step[] = [
  {
    id: 1,
    icon: User,
    title: "1. Input Utente",
    description: "L'utente compila il form con i suoi dati (nome, email, messaggio)",
    code: `// L'utente inserisce i dati nel form
const [formData, setFormData] = useState({
  nome: "",
  email: "",
  messaggio: ""
});`,
    color: "text-primary",
  },
  {
    id: 2,
    icon: FileText,
    title: "2. Validazione",
    description: "I dati vengono validati: email corretta? Campi compilati?",
    code: `// Validazione dei dati
const validateForm = () => {
  if (!formData.email.includes('@')) {
    return { valid: false, error: "Email non valida" };
  }
  if (formData.nome.length < 2) {
    return { valid: false, error: "Nome troppo corto" };
  }
  return { valid: true };
};`,
    color: "text-secondary",
  },
  {
    id: 3,
    icon: Database,
    title: "3. Salvataggio",
    description: "I dati validati vengono salvati (simulato in localStorage)",
    code: `// Salvataggio nel "database" (localStorage)
const saveLead = (data) => {
  const esistenti = JSON.parse(
    localStorage.getItem('leads') || '[]'
  );
  const nuovoLead = {
    ...data,
    id: Date.now(),
    dataCreazione: new Date().toISOString()
  };
  esistenti.push(nuovoLead);
  localStorage.setItem('leads', JSON.stringify(esistenti));
};`,
    color: "text-accent",
  },
  {
    id: 4,
    icon: CheckCircle,
    title: "4. Conferma",
    description: "L'utente riceve feedback positivo. Lead salvato con successo!",
    code: `// Feedback all'utente
toast({
  title: "Lead salvato! ✨",
  description: "I tuoi dati sono stati registrati."
});

// Reset del form
setFormData({ nome: "", email: "", messaggio: "" });`,
    color: "text-green-500",
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
      }, (index + 1) * 1200);
    });
  };

  const reset = () => {
    setActiveStep(0);
    setIsPlaying(false);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="educational-badge mb-4 inline-flex">
            <Info className="w-3.5 h-3.5" />
            Diagramma Interattivo
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Il Flusso dei <span className="gradient-text">Dati</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Clicca "Avvia" per vedere come i dati del form viaggiano fino al salvataggio
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={playAnimation} 
              disabled={isPlaying}
              className="gradient-bg"
            >
              <Play className="w-4 h-4 mr-2" />
              Avvia Animazione
            </Button>
            <Button variant="outline" onClick={reset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Flow diagram */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            {steps.map((step, index) => (
              <div key={step.id} className="w-full">
                {/* Step card */}
                <Card 
                  className={`transition-all duration-500 border-2 ${
                    activeStep >= step.id 
                      ? "border-primary shadow-lg scale-100 opacity-100" 
                      : "border-transparent opacity-50 scale-95"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Icon and title */}
                      <div className="flex items-center gap-4 md:w-1/3">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          activeStep >= step.id ? "gradient-bg" : "bg-muted"
                        }`}>
                          <step.icon className={`w-7 h-7 ${activeStep >= step.id ? "text-white" : "text-muted-foreground"}`} />
                        </div>
                        <div>
                          <h3 className={`font-bold text-lg ${step.color}`}>{step.title}</h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>

                      {/* Code */}
                      <div className="md:w-2/3">
                        <div className={`code-block text-xs transition-all duration-500 ${
                          activeStep >= step.id ? "opacity-100" : "opacity-30"
                        }`}>
                          <pre>{step.code}</pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-2">
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
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-bg text-white font-semibold">
              <CheckCircle className="w-5 h-5" />
              Flusso Completato! Il lead è stato salvato nel localStorage
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DataFlowDiagram;
