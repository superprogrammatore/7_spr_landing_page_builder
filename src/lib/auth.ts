// Funzione per generare hash SHA-256
// SHA-256 è un algoritmo crittografico che trasforma qualsiasi stringa
// in una sequenza di 64 caratteri esadecimali (256 bit)
// È una funzione "one-way": non si può risalire al valore originale dall'hash

export async function hashCode(code: string): Promise<string> {
  // Convertiamo la stringa in un array di byte (Uint8Array)
  // Questo è necessario perché l'API crypto lavora con dati binari
  const encoder = new TextEncoder();
  const data = encoder.encode(code);
  
  // Usiamo la Web Crypto API del browser per calcolare l'hash SHA-256
  // crypto.subtle è l'API per operazioni crittografiche
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Convertiamo il buffer binario in una stringa esadecimale leggibile
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

// Normalizza l'input utente prima dell'hash.
// Serve a gestire casi comuni quando si incolla un codice:
// - spazi iniziali/finali
// - NBSP (spazio "speciale")
// - caratteri invisibili (zero-width)
// - differenze Unicode equivalenti (normalize)
function normalizeAccessCode(input: string): string {
  return input
    .normalize("NFKC")
    // Uniforma trattini "speciali" che alcuni device tastiere sostituiscono automaticamente
    // (en-dash, em-dash, minus sign, ecc.)
    .replace(/[\u2010-\u2015\u2212]/g, "-")
    // Rimuove caratteri invisibili comuni (zero-width, BOM, NBSP)
    .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, "")
    // Rimuove QUALSIASI whitespace (spazi, new line, tab) introdotta dal copia/incolla
    .replace(/\s+/g, "")
    .trim();
}

// L'hash pre-calcolato del codice di accesso corretto
// Questo è l'hash SHA-256 di: gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E
// In questo modo il codice originale NON è mai memorizzato nel codice sorgente!
export const VALID_CODE_HASH = "f0e4c2f76c58916ec252921922247a9e612811770051202c422476917e7423a6";

// Funzione per verificare se il codice inserito è corretto
export async function verifyCode(inputCode: string): Promise<boolean> {
  const normalized = normalizeAccessCode(inputCode);
  const inputHash = await hashCode(normalized);
  // Confrontiamo gli hash, non i codici in chiaro
  return inputHash === VALID_CODE_HASH;
}

// Gestione della sessione con localStorage
const AUTH_KEY = "landing_builder_authenticated";

export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function setAuthenticated(value: boolean): void {
  if (value) {
    localStorage.setItem(AUTH_KEY, "true");
  } else {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function logout(): void {
  setAuthenticated(false);
}
