import { useState, useEffect } from "react";
import { Database, Trash2, RefreshCw, User, Mail, MessageSquare, Calendar, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLeads } from "./ContactForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Lead = {
  id: number;
  nome: string;
  email: string;
  messaggio: string;
  dataCreazione: string;
};

const LeadsDashboard = ({ refreshTrigger }: { refreshTrigger: number }) => {
  const [leads, setLeads] = useState<Lead[]>([]);

  const loadLeads = () => {
    setLeads(getLeads());
  };

  const clearAllLeads = () => {
    localStorage.removeItem("leads");
    setLeads([]);
  };

  const deleteLead = (id: number) => {
    const updatedLeads = leads.filter((lead) => lead.id !== id);
    localStorage.setItem("leads", JSON.stringify(updatedLeads));
    setLeads(updatedLeads);
  };

  useEffect(() => {
    loadLeads();
  }, [refreshTrigger]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="educational-badge mb-4 inline-flex">
              <Database className="w-3.5 h-3.5" />
              Database Simulato
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              I Tuoi <span className="gradient-text">Lead Salvati</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              Qui puoi vedere tutti i lead salvati nel localStorage del browser.
              In un'app reale, questi dati sarebbero in un database come Supabase.
            </p>

            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={loadLeads}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Aggiorna
              </Button>
              
              {leads.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Cancella Tutti
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                        Conferma cancellazione
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Stai per cancellare tutti i lead salvati. Questa azione non può essere annullata.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annulla</AlertDialogCancel>
                      <AlertDialogAction onClick={clearAllLeads} className="bg-destructive hover:bg-destructive/90">
                        Cancella Tutti
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-primary">{leads.length}</div>
                <div className="text-sm text-muted-foreground">Lead Totali</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-secondary">
                  {leads.length > 0 
                    ? Math.round(JSON.stringify(leads).length / 1024 * 100) / 100 
                    : 0} KB
                </div>
                <div className="text-sm text-muted-foreground">Spazio Usato</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-accent">localStorage</div>
                <div className="text-sm text-muted-foreground">Storage Type</div>
              </CardContent>
            </Card>
          </div>

          {/* Code explanation */}
          <Card className="mb-8 border-2 border-dashed">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Database className="w-5 h-5" />
                Come funziona il salvataggio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="code-block text-xs overflow-x-auto">
                <pre>{`// Lettura dei lead dal localStorage
const getLeads = () => {
  const data = localStorage.getItem('leads');
  return data ? JSON.parse(data) : [];
};

// Salvataggio di un nuovo lead
const saveLead = (formData) => {
  const leads = getLeads();
  const nuovoLead = {
    ...formData,
    id: Date.now(),              // ID univoco
    dataCreazione: new Date()    // Timestamp
  };
  leads.push(nuovoLead);
  localStorage.setItem('leads', JSON.stringify(leads));
};

// ⚠️ NOTA: In produzione useremmo un database reale!
// localStorage è utile solo per demo/prototipi`}</pre>
              </div>
            </CardContent>
          </Card>

          {/* Leads list */}
          {leads.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="p-12 text-center">
                <Database className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nessun lead salvato</h3>
                <p className="text-muted-foreground">
                  Compila il form sopra per vedere i dati apparire qui!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {leads.map((lead, index) => (
                <Card 
                  key={lead.id} 
                  className="group hover:shadow-lg transition-all hover:border-primary/50"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-primary" />
                              <span className="font-semibold">{lead.nome}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="w-3 h-3" />
                              {lead.email}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 mb-3">
                          <MessageSquare className="w-4 h-4 text-secondary mt-1 shrink-0" />
                          <p className="text-muted-foreground">{lead.messaggio}</p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {formatDate(lead.dataCreazione)}
                          <span className="text-muted-foreground/50">•</span>
                          <span className="font-mono text-muted-foreground/70">ID: {lead.id}</span>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => deleteLead(lead.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LeadsDashboard;
