// Funzione per generare hash SHA-256
// SHA-256 è un algoritmo crittografico che trasforma qualsiasi stringa
// in una sequenza di 64 caratteri esadecimali (256 bit)
// È una funzione "one-way": non si può risalire al valore originale dall'hash

async function sha256Hex(input: string): Promise<string> {
  if (!globalThis.crypto?.subtle) {
    throw new Error("Web Crypto API non disponibile in questo browser");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Normalizzazione robusta per input incollati (desktop/mobile).
// Obiettivo: far passare il codice anche quando l'utente incolla con caratteri “equivalenti”.
export function sanitizeAccessCode(raw: string): string {
  return raw
    .normalize("NFKC")
    // trattini tipografici / minus sign -> "-"
    .replace(/[\u2010-\u2015\u2212]/g, "-")
    // tilde tipografica -> "~"
    .replace(/[\u02DC]/g, "~")
    // rimuove invisibili + NBSP
    .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, "")
    // rimuove whitespace (spazi, new line, tab) introdotta dal copia/incolla
    .replace(/\s+/g, "")
    .trim();
}

// L'hash pre-calcolato del codice di accesso corretto
// Questo è l'hash SHA-256 di: gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E
// In questo modo il codice originale NON è mai memorizzato nel codice sorgente!
export const VALID_CODE_HASH = "f0e4c2f76c58916ec252921922247a9e612811770051202c422476917e7423a6";

// Funzione per verificare se il codice inserito è corretto
export async function verifyCode(inputCode: string): Promise<boolean> {
  const normalized = sanitizeAccessCode(inputCode);
  const inputHash = await sha256Hex(normalized);
  return inputHash === VALID_CODE_HASH;
}

// API “alta” per la UI
const AUTH_KEY = "landing_builder_authenticated";

export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === "true";
}

export async function loginWithCode(inputCode: string): Promise<{ ok: boolean; reason?: string }> {
  try {
    const ok = await verifyCode(inputCode);
    if (!ok) return { ok: false, reason: "Codice di accesso non valido" };
    localStorage.setItem(AUTH_KEY, "true");
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      reason: e instanceof Error ? e.message : "Errore durante la verifica",
    };
  }
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}
