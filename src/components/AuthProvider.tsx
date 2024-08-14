import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decoded = jwtDecode<{ exp: number }>(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp && decoded.exp < currentTime) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setIsAuthenticated(false);
          setToken(null);
          router.push("/login");
        } else {
          setIsAuthenticated(true);
          setToken(token);
        }
      } catch (e) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setIsAuthenticated(false);
        setToken(null);
        router.push("/login");
      }
    } else {
      setIsAuthenticated(false);
      setToken(null);
    }
    setLoading(false);
  }, [router]);

  const login = (access: string, refresh: string) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    setIsAuthenticated(true);
    setToken(access);
    router
      .push("/main")
      .catch((err) => console.error("Navigation error:", err));
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
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
