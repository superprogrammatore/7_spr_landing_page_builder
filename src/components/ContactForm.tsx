import { useState } from "react";
import { Send, User, Mail, MessageSquare, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type FormData = {
  nome: string;
  email: string;
  messaggio: string;
};

type ValidationErrors = {
  nome?: string;
  email?: string;
  messaggio?: string;
};

type Lead = FormData & {
  id: number;
  dataCreazione: string;
};

// Funzione per ottenere i lead dal localStorage
export const getLeads = (): Lead[] => {
  try {
    return JSON.parse(localStorage.getItem("leads") || "[]");
  } catch {
    return [];
  }
};

// Funzione per salvare un nuovo lead
export const saveLead = (data: FormData): Lead => {
  const leads = getLeads();
  const nuovoLead: Lead = {
    ...data,
    id: Date.now(),
    dataCreazione: new Date().toISOString(),
  };
  leads.push(nuovoLead);
  localStorage.setItem("leads", JSON.stringify(leads));
  return nuovoLead;
};

const ContactForm = ({ onLeadSaved }: { onLeadSaved?: () => void }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    messaggio: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExplanation, setShowExplanation] = useState<string | null>(null);

  // Validazione dei campi
  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "Il nome è obbligatorio";
    } else if (formData.nome.length < 2) {
      newErrors.nome = "Il nome deve avere almeno 2 caratteri";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email è obbligatoria";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Inserisci un'email valida";
    }

    if (!formData.messaggio.trim()) {
      newErrors.messaggio = "Il messaggio è obbligatorio";
    } else if (formData.messaggio.length < 10) {
      newErrors.messaggio = "Il messaggio deve avere almeno 10 caratteri";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Step 1: Validazione
    if (!validate()) {
      toast({
        variant: "destructive",
        title: "Errore di validazione",
        description: "Controlla i campi evidenziati in rosso",
      });
      return;
    }

    setIsSubmitting(true);

    // Simuliamo un piccolo delay come in una vera chiamata API
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Step 2: Salvataggio
    try {
      saveLead(formData);

      // Step 3: Feedback positivo
      toast({
        title: "Lead salvato con successo! 🎉",
        description: "I dati sono stati salvati nel localStorage del browser",
      });

      // Reset form
      setFormData({ nome: "", email: "", messaggio: "" });
      setErrors({});

      // Notifica il componente padre
      onLeadSaved?.();
    } catch {
      toast({
        variant: "destructive",
        title: "Errore",
        description: "Si è verificato un errore durante il salvataggio",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Rimuovi l'errore quando l'utente inizia a digitare
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="contact-form" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="educational-badge mb-4 inline-flex">
              <Sparkles className="w-3.5 h-3.5" />
              Componente Interattivo
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Prova il <span className="gradient-text">Form di Contatto</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Compila il form e guarda come i dati vengono salvati nel browser
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <Card className="lg:col-span-3 border-2 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary" />
                  Contattaci
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nome */}
                  <div 
                    className="space-y-2"
                    onMouseEnter={() => setShowExplanation("nome")}
                    onMouseLeave={() => setShowExplanation(null)}
                  >
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <User className="w-4 h-4" />
                      Nome
                    </label>
                    <Input
                      placeholder="Il tuo nome"
                      value={formData.nome}
                      onChange={(e) => handleChange("nome", e.target.value)}
                      className={errors.nome ? "border-destructive" : ""}
                    />
                    {errors.nome && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.nome}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div
                    className="space-y-2"
                    onMouseEnter={() => setShowExplanation("email")}
                    onMouseLeave={() => setShowExplanation(null)}
                  >
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <Mail className="w-4 h-4" />
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="la-tua@email.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Messaggio */}
                  <div
                    className="space-y-2"
                    onMouseEnter={() => setShowExplanation("messaggio")}
                    onMouseLeave={() => setShowExplanation(null)}
                  >
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <MessageSquare className="w-4 h-4" />
                      Messaggio
                    </label>
                    <Textarea
                      placeholder="Scrivi il tuo messaggio..."
                      value={formData.messaggio}
                      onChange={(e) => handleChange("messaggio", e.target.value)}
                      className={`min-h-[120px] ${errors.messaggio ? "border-destructive" : ""}`}
                    />
                    {errors.messaggio && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.messaggio}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <Button 
                    type="submit" 
                    className="w-full gradient-bg text-lg py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Salvataggio in corso...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Invia e Salva Lead
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Spiegazione laterale */}
            <div className="lg:col-span-2 space-y-4">
              <Card className={`transition-all duration-300 ${showExplanation === "nome" ? "border-primary shadow-lg" : "opacity-70"}`}>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Campo Nome
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Raccoglie l'identità del lead. Utile per personalizzare le comunicazioni future.
                  </p>
                  <div className="code-block text-xs">
                    <pre>{`// Validazione
if (nome.length < 2) {
  error = "Troppo corto"
}`}</pre>
                  </div>
                </CardContent>
              </Card>

              <Card className={`transition-all duration-300 ${showExplanation === "email" ? "border-secondary shadow-lg" : "opacity-70"}`}>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-secondary" />
                    Campo Email
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Il dato più importante! Validato con regex per assicurarsi che sia un formato corretto.
                  </p>
                  <div className="code-block text-xs">
                    <pre>{`// Regex validazione
const emailRegex = 
  /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;`}</pre>
                  </div>
                </CardContent>
              </Card>

              <Card className={`transition-all duration-300 ${showExplanation === "messaggio" ? "border-accent shadow-lg" : "opacity-70"}`}>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-accent" />
                    Campo Messaggio
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Fornisce contesto sulla richiesta. Aiuta a qualificare il lead.
                  </p>
                  <div className="code-block text-xs">
                    <pre>{`// Textarea espandibile
<Textarea 
  minLength={10}
  placeholder="..."
/>`}</pre>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-muted/50 rounded-xl p-4 border">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="font-semibold">Hover sui campi!</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Passa il mouse sui campi del form per vedere le spiegazioni dettagliate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
