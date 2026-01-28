import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import LearnSection from "@/components/LearnSection";
import DataFlowDiagram from "@/components/DataFlowDiagram";
import ContactForm from "@/components/ContactForm";
import LeadsDashboard from "@/components/LeadsDashboard";
import Footer from "@/components/Footer";

const Index = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleLeadSaved = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Prima impressione */}
      <HeroSection />

      {/* Sezione Educativa - Spiega i concetti */}
      <LearnSection />

      {/* Diagramma Interattivo - Mostra il flusso dati */}
      <DataFlowDiagram />

      {/* Form di Contatto - Componente pratico */}
      <ContactForm onLeadSaved={handleLeadSaved} />

      {/* Dashboard Lead - Visualizza i dati salvati */}
      <LeadsDashboard refreshTrigger={refreshTrigger} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
