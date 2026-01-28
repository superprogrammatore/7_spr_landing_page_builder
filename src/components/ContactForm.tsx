import { useState } from "react";
import { Send, User, Mail, MessageSquare, Sparkles, AlertCircle, CheckCircle2, Info, Code2, Lightbulb } from "lucide-react";
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

// ============================================
// 📚 FUNZIONI DI GESTIONE DATI
// Queste funzioni gestiscono il "database" (localStorage)
// ============================================

// Funzione per ottenere i lead dal localStorage
export const getLeads = (): Lead[] => {
  try {
    // localStorage.getItem recupera dati salvati nel browser
    // JSON.parse converte la stringa JSON in un oggetto JavaScript
    return JSON.parse(localStorage.getItem("leads") || "[]");
  } catch {
    // Se c'è un errore (dati corrotti), ritorna array vuoto
    return [];
  }
};

// Funzione per salvare un nuovo lead
export const saveLead = (data: FormData): Lead => {
  // 1. Recupera tutti i lead esistenti
  const leads = getLeads();
  
  // 2. Crea il nuovo lead con metadati aggiuntivi
  const nuovoLead: Lead = {
    ...data,                                    // Spread: copia tutti i campi del form
    id: Date.now(),                             // ID univoco basato sul timestamp
    dataCreazione: new Date().toISOString(),    // Data in formato ISO
  };
  
  // 3. Aggiungi il nuovo lead all'array
  leads.push(nuovoLead);
  
  // 4. Salva tutto nel localStorage
  // JSON.stringify converte l'oggetto in stringa (necessario per localStorage)
  localStorage.setItem("leads", JSON.stringify(leads));
  
  // 5. Ritorna il lead appena creato
  return nuovoLead;
};

// ============================================
// 📝 COMPONENTE FORM
// ============================================

const ContactForm = ({ onLeadSaved }: { onLeadSaved?: () => void }) => {
  const { toast } = useToast();
  
  // State per i dati del form
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    messaggio: "",
  });
  
  // State per gli errori di validazione
  const [errors, setErrors] = useState<ValidationErrors>({});
  
  // State per lo stato di caricamento
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State per mostrare spiegazioni
  const [showExplanation, setShowExplanation] = useState<string | null>(null);
  
  // State per mostrare il log delle operazioni
  const [operationLog, setOperationLog] = useState<string[]>([]);

  // Funzione di validazione
  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};
    const log: string[] = [];
    
    log.push("🔍 Inizio validazione...");

    // Validazione nome
    if (!formData.nome.trim()) {
      newErrors.nome = "Il nome è obbligatorio";
      log.push("❌ Nome: campo vuoto");
    } else if (formData.nome.length < 2) {
      newErrors.nome = "Il nome deve avere almeno 2 caratteri";
      log.push("❌ Nome: troppo corto");
    } else {
      log.push("✅ Nome: valido");
    }

    // Validazione email con regex
    if (!formData.email.trim()) {
      newErrors.email = "L'email è obbligatoria";
      log.push("❌ Email: campo vuoto");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Inserisci un'email valida (es: nome@dominio.com)";
      log.push("❌ Email: formato non valido");
    } else {
      log.push("✅ Email: valida");
    }

    // Validazione messaggio
    if (!formData.messaggio.trim()) {
      newErrors.messaggio = "Il messaggio è obbligatorio";
      log.push("❌ Messaggio: campo vuoto");
    } else if (formData.messaggio.length < 10) {
      newErrors.messaggio = "Il messaggio deve avere almeno 10 caratteri";
      log.push("❌ Messaggio: troppo corto");
    } else {
      log.push("✅ Messaggio: valido");
    }

    const isValid = Object.keys(newErrors).length === 0;
    log.push(isValid ? "✅ Validazione completata: SUCCESSO" : "❌ Validazione completata: ERRORI TROVATI");
    
    setOperationLog(log);
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // preventDefault evita che il form ricarichi la pagina
    e.preventDefault();
    
    setOperationLog(["🚀 Form inviato, inizio elaborazione..."]);

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
    setOperationLog(prev => [...prev, "⏳ Salvataggio in corso..."]);

    // Simuliamo un delay come in una vera chiamata API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Step 2: Salvataggio
    try {
      const savedLead = saveLead(formData);
      
      setOperationLog(prev => [
        ...prev, 
        `💾 Lead salvato con ID: ${savedLead.id}`,
        `📅 Data: ${new Date(savedLead.dataCreazione).toLocaleString('it-IT')}`,
        "✅ Operazione completata con successo!"
      ]);

      // Step 3: Feedback positivo
      toast({
        title: "Lead salvato con successo! 🎉",
        description: "I dati sono stati salvati nel localStorage. Controlla la dashboard sotto!",
      });

      // Reset form
      setFormData({ nome: "", email: "", messaggio: "" });
      setErrors({});

      // Notifica il componente padre
      onLeadSaved?.();
    } catch {
      setOperationLog(prev => [...prev, "❌ Errore durante il salvataggio"]);
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="educational-badge mb-4 inline-flex">
              <Sparkles className="w-3.5 h-3.5" />
              Componente Interattivo
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Prova il <span className="gradient-text">Form di Contatto</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Compila il form e osserva in tempo reale come vengono elaborati i dati
            </p>
          </div>

          {/* Instructions */}
          <Card className="max-w-3xl mx-auto mb-8 border-2 border-dashed border-primary/30">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Come usare questo form:</p>
                  <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                    <li><strong>Passa il mouse</strong> sui campi per vedere spiegazioni dettagliate</li>
                    <li><strong>Compila i campi</strong> e osserva la validazione in tempo reale</li>
                    <li><strong>Clicca Invia</strong> per vedere il log delle operazioni</li>
                    <li><strong>Controlla la dashboard</strong> sotto per vedere il lead salvato</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <Card className="lg:col-span-2 border-2 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary" />
                  Contattaci
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    (Form funzionante)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nome */}
                  <div 
                    className={`space-y-2 p-4 rounded-lg transition-all ${showExplanation === "nome" ? "bg-primary/5 ring-2 ring-primary/20" : ""}`}
                    onMouseEnter={() => setShowExplanation("nome")}
                    onMouseLeave={() => setShowExplanation(null)}
                  >
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <User className="w-4 h-4 text-primary" />
                      Nome
                      <span className="text-destructive">*</span>
                    </label>
                    <Input
                      placeholder="Il tuo nome (es: Mario Rossi)"
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
                    {formData.nome && !errors.nome && (
                      <p className="text-sm text-green-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Nome valido!
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div
                    className={`space-y-2 p-4 rounded-lg transition-all ${showExplanation === "email" ? "bg-secondary/5 ring-2 ring-secondary/20" : ""}`}
                    onMouseEnter={() => setShowExplanation("email")}
                    onMouseLeave={() => setShowExplanation(null)}
                  >
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <Mail className="w-4 h-4 text-secondary" />
                      Email
                      <span className="text-destructive">*</span>
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
                    {formData.email && !errors.email && formData.email.includes("@") && (
                      <p className="text-sm text-green-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Email valida!
                      </p>
                    )}
                  </div>

                  {/* Messaggio */}
                  <div
                    className={`space-y-2 p-4 rounded-lg transition-all ${showExplanation === "messaggio" ? "bg-accent/5 ring-2 ring-accent/20" : ""}`}
                    onMouseEnter={() => setShowExplanation("messaggio")}
                    onMouseLeave={() => setShowExplanation(null)}
                  >
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <MessageSquare className="w-4 h-4 text-accent" />
                      Messaggio
                      <span className="text-destructive">*</span>
                      <span className="text-muted-foreground text-xs">
                        ({formData.messaggio.length}/10 caratteri min.)
                      </span>
                    </label>
                    <Textarea
                      placeholder="Scrivi il tuo messaggio... (minimo 10 caratteri)"
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
                    {formData.messaggio.length >= 10 && (
                      <p className="text-sm text-green-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Messaggio valido!
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

                {/* Operation Log */}
                {operationLog.length > 0 && (
                  <div className="mt-6 p-4 rounded-xl bg-muted/50 border">
                    <div className="flex items-center gap-2 mb-3">
                      <Code2 className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-sm">📋 Log Operazioni (cosa sta succedendo):</span>
                    </div>
                    <div className="space-y-1">
                      {operationLog.map((log, i) => (
                        <div key={i} className="text-sm font-mono text-muted-foreground animate-in fade-in slide-in-from-left-2" style={{ animationDelay: `${i * 100}ms` }}>
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Spiegazione laterale */}
            <div className="space-y-4">
              <Card className={`transition-all duration-300 ${showExplanation === "nome" ? "border-primary shadow-lg scale-105" : "opacity-60"}`}>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Campo Nome
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>Scopo:</strong> Identificare il lead per personalizzare le comunicazioni.
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>Validazione:</strong> Minimo 2 caratteri, campo obbligatorio.
                  </p>
                  <div className="code-block text-xs">
                    <pre>{`// Validazione
if (nome.length < 2) {
  return "Troppo corto";
}`}</pre>
                  </div>
                </CardContent>
              </Card>

              <Card className={`transition-all duration-300 ${showExplanation === "email" ? "border-secondary shadow-lg scale-105" : "opacity-60"}`}>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-secondary" />
                    Campo Email
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>Scopo:</strong> Il dato PIÙ IMPORTANTE! Permette di ricontattare il lead.
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>Validazione:</strong> Usa una regex per verificare il formato corretto.
                  </p>
                  <div className="code-block text-xs">
                    <pre>{`// Regex email
const regex = 
/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/

// Controlla formato
if (!regex.test(email)) {
  return "Email non valida";
}`}</pre>
                  </div>
                </CardContent>
              </Card>

              <Card className={`transition-all duration-300 ${showExplanation === "messaggio" ? "border-accent shadow-lg scale-105" : "opacity-60"}`}>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-accent" />
                    Campo Messaggio
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>Scopo:</strong> Capire l'interesse/esigenza del lead per qualificarlo.
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>Validazione:</strong> Minimo 10 caratteri per avere contesto utile.
                  </p>
                  <div className="code-block text-xs">
                    <pre>{`// Textarea
<Textarea
  minLength={10}
  placeholder="..."
  onChange={handleChange}
/>`}</pre>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-4 border">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-5 h-5 text-primary" />
                  <span className="font-semibold">💡 Suggerimento</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Passa il mouse sui campi del form per vedere le spiegazioni dettagliate su ogni campo!
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
