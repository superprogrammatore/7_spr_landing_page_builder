import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import LearnSection from "@/components/LearnSection";
import DataFlowDiagram from "@/components/DataFlowDiagram";
import ContactForm from "@/components/ContactForm";
import LeadsDashboard from "@/components/LeadsDashboard";
import Footer from "@/components/Footer";
import AccessGate from "@/components/AccessGate";

const Index = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleLeadSaved = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <AccessGate>
      <div className="min-h-screen bg-background">
        <HeroSection />
        <LearnSection />
        <DataFlowDiagram />
        <ContactForm onLeadSaved={handleLeadSaved} />
        <LeadsDashboard refreshTrigger={refreshTrigger} />
        <Footer />
      </div>
    </AccessGate>
  );
};

export default Index;
