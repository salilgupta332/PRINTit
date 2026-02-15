import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // detect dashboard route
  const isDashboard = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    const root = document.documentElement;

    // Dashboard → force light
    if (isDashboard) {
      root.classList.remove("dark");
      return;
    }

    // Public pages → allow dark
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme, location.pathname]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);