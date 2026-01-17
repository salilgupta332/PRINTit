import React from "react";
import { createContext, useState, useEffect } from "react";
console.log("AuthContext loaded - new version");

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ ADD

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
    setLoading(false); // ✅ auth check finished
  }, []);

  const login = (jwt) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        loading,          // ✅ expose loading
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
