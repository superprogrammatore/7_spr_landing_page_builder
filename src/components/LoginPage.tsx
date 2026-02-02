import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import superProgrammatoreLogo from "@/assets/super-programmatore-logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { login } from "@/lib/auth";

interface LoginPageProps {
  onSuccess: () => void;
}

const LoginPage = ({ onSuccess }: LoginPageProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const ok = await login(code);
    if (ok) {
      onSuccess();
    } else {
      setError("Codice di accesso non valido");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <img 
            src={superProgrammatoreLogo} 
            alt="Super Programmatore" 
            className="w-64 h-auto mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold">Accesso Richiesto</h1>
          <p className="text-muted-foreground mt-2">
            Inserisci il codice per continuare
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Codice di Accesso</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type={showCode ? "text" : "password"}
                  placeholder="Inserisci il codice..."
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError("");
                  }}
                  className="pr-10 font-mono"
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowCode(!showCode)}
                >
                  {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button type="submit" className="w-full" disabled={loading || !code}>
                {loading ? "Verifica..." : "Accedi"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
