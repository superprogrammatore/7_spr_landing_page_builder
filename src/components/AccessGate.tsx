import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoginPage from "@/components/LoginPage";
import { isAuthenticated, logout } from "@/lib/auth";

type AccessGateProps = {
  children: React.ReactNode;
};

const AccessGate = ({ children }: AccessGateProps) => {
  const [ready, setReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isAuthenticated());
    setReady(true);
  }, []);

  if (!ready) return null;

  if (!loggedIn) {
    return <LoginPage onLoginSuccess={() => setLoggedIn(true)} />;
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          logout();
          setLoggedIn(false);
        }}
        className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Esci
      </Button>
      {children}
    </>
  );
};

export default AccessGate;
