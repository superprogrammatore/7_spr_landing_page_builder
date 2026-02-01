import { useRef, useState } from "react";
import { Lock, Key, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { loginWithCode, sanitizeAccessCode } from "@/lib/auth";

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    setError("");
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    // Normalizziamo subito ciò che viene incollato per evitare caratteri invisibili.
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    const sanitized = sanitizeAccessCode(pasted);
    setCode(sanitized);
    setError("");
    // manteniamo il focus e mettiamo il cursore in fondo
    requestAnimationFrame(() => {
      const el = inputRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 250));

    const res = await loginWithCode(code);
    if (res.ok) onLoginSuccess();
    else setError(res.reason ?? "Codice di accesso non valido. Riprova.");
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl gradient-bg flex items-center justify-center">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">
            Landing <span className="gradient-text">Builder</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Inserisci il codice di accesso per continuare
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" />
              Autenticazione con Codice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type={showCode ? "text" : "password"}
                  placeholder="Inserisci il codice di accesso..."
                  value={code}
                  onChange={handleCodeChange}
                  onPaste={handlePaste}
                  ref={inputRef}
                  className="pr-12 font-mono"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowCode(!showCode)}
                >
                  {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading || !code}>
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifica in corso...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Accedi
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
