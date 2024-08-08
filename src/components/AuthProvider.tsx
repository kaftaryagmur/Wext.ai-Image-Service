import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  token: string | null;
  login: (access: string, refresh: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Geçici olarak true
  const [loading, setLoading] = useState(false); // Geçici olarak false
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = (access: string, refresh: string) => {
    console.log("Login token:", access);
    setToken(access);
    router.push("/main");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
