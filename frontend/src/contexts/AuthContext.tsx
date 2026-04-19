import React, { createContext, useState, useEffect, useContext } from "react";
import { apiFetch } from "@/api/client";

type AppUser = {
  id: string;
  name: string;
  email: string;
  mobileNumber?: string;
  role?: string;
} | null;

type AuthContextValue = {
  token: string | null;
  user: AppUser;
  isAuthenticated: boolean;
  loading: boolean;
  login: (jwt: string, userData?: AppUser) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AppUser>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const data = await apiFetch("/auth/me");
      const nextUser = data?.user || null;
      setUser(nextUser);
      if (nextUser) {
        localStorage.setItem("user", JSON.stringify(nextUser));
      }
    } catch {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) {
      setToken(savedToken);
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (!token) return;
    refreshUser();
  }, [token]);

  const login = (jwt: string, userData?: AppUser) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);

    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
