"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { authAPI, userAPI, User, LoginPayload, RegisterPayload } from "@/lib/api";

// ============================================================
//  Token helpers (localStorage — client only)
// ============================================================
const TOKEN_KEY = "foreal_token";

function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

function setStoredToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

function clearStoredToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

// ============================================================
//  Context types
// ============================================================
interface AuthContextValue {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<boolean>;
  register: (payload: RegisterPayload) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ============================================================
//  Provider
// ============================================================
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  // Start as true so we never flash unauthenticated state before checking localStorage
  const [isLoading, setIsLoading] = useState(true);

  // Use ref so loadProfile always has the latest version without deps issues
  const loadProfileRef = useRef<(() => Promise<void>) | null>(null);

  const loadProfile = useCallback(async () => {
    try {
      const res = await userAPI.getProfile();
      if (res?.data) setUser(res.data);
    } catch {
      // Token may be expired — clear everything
      clearStoredToken();
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Keep the ref up to date
  loadProfileRef.current = loadProfile;

  // On client mount: check localStorage for an existing token
  useEffect(() => {
    const stored = getStoredToken();
    if (stored) {
      setToken(stored);
      loadProfileRef.current?.();
    } else {
      setIsLoading(false);
    }
  }, []); // runs once on mount

  // ── Auth actions ──────────────────────────────────────────

  const login = useCallback(
    async (payload: LoginPayload) => {
      const res = await authAPI.login(payload);
      const token = res.data?.api_token;
      if (token && res.data) {
        setStoredToken(token);
        setToken(token);
        setUser(res.data);
        await loadProfile();
        return true;
      } else {
        throw new Error(res.message || "Login failed");
      }
    },
    [loadProfile]
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      const res = await authAPI.register(payload);
      // Backend may not return a token on registration if email confirmation is required.
      const token = res.data?.api_token;
      if (token && res.data) {
        setStoredToken(token);
        setToken(token);
        setUser(res.data);
        await loadProfile();
        return true;
      } else if (res.message && res.status === 200) {
         // Some APIs return 200 without token (e.g. need to confirm email)
         return false; 
      } else {
        throw new Error(res.message || "Registration failed");
      }
    },
    [loadProfile]
  );

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch {
      // Ignore API errors on logout
    } finally {
      clearStoredToken();
      setToken(null);
      setUser(null);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    await loadProfile();
  }, [loadProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!token && !!user,
        isLoading,
        login,
        register,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ============================================================
//  Hook
// ============================================================
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
