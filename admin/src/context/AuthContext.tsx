import { createContext, useContext, useEffect, useState } from "react";
import { apiPost, apiGet } from "@/api/client";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
} | null;

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: AdminUser;
  login: (tokenOrEmail: string, maybePassword?: string, maybeUser?: AdminUser) => Promise<boolean> | void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("admin");

    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("admin");
      }
    }
  }, []);

  const refreshUser = async () => {
    if (!localStorage.getItem("token")) return;

    try {
      const data = await apiGet("/admin/me", localStorage.getItem("token"));
      const admin = data?.admin || null;
      setUser(admin);
      if (admin) {
        localStorage.setItem("admin", JSON.stringify(admin));
      }
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    if (token) {
      refreshUser();
    }
  }, [token]);

  const login = async (
    tokenOrEmail: string,
    maybePassword?: string,
    maybeUser?: AdminUser,
  ) => {
    if (maybePassword !== undefined) {
      try {
        const data = await apiPost("/admin/login", {
          email: tokenOrEmail,
          password: maybePassword,
        });

        localStorage.setItem("token", data.token);
        if (data.admin) {
          localStorage.setItem("admin", JSON.stringify(data.admin));
          setUser(data.admin);
        }
        setToken(data.token);
        setIsAuthenticated(true);
        return true;
      } catch {
        return false;
      }
    }

    localStorage.setItem("token", tokenOrEmail);
    if (maybeUser) {
      localStorage.setItem("admin", JSON.stringify(maybeUser));
      setUser(maybeUser);
    }
    setToken(tokenOrEmail);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
