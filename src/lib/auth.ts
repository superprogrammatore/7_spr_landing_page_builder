// Hash SHA-256 del codice di accesso
// Il codice originale NON è memorizzato nel codice sorgente
const VALID_CODE_HASH = "f0e4c2f76c58916ec252921922247a9e612811770051202c422476917e7423a6";

async function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function sanitize(raw: string): string {
  return raw
    .normalize("NFKC")
    .replace(/[\u2010-\u2015\u2212]/g, "-")
    .replace(/[\u02DC]/g, "~")
    .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, "")
    .replace(/\s+/g, "")
    .trim();
}

const AUTH_KEY = "app_authenticated";

export const isAuthenticated = (): boolean => 
  localStorage.getItem(AUTH_KEY) === "true";

export const logout = (): void => 
  localStorage.removeItem(AUTH_KEY);

export async function login(code: string): Promise<boolean> {
  const hash = await sha256(sanitize(code));
  if (hash === VALID_CODE_HASH) {
    localStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
}
