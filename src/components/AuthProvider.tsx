import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode"; // 'jwtDecode' yerine 'jwt-decode' olarak kullanın

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  token: string | null; // token'ı ekleyin
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // yükleme durumu eklendi
  const [token, setToken] = useState<string | null>(null); // token durumu eklendi
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: { exp: number } = jwtDecode<{ exp: number }>(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          router.push("/login");
        } else {
          setToken(token); // token'ı ayarlayın
          setIsAuthenticated(true);
        }
      } catch (e) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        router.push("/login");
      }
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // Yükleme durumu tamamlandı
  }, [router]);

  const login = (token: string) => {
    console.log("Login token:", token);
    localStorage.setItem("token", token);
    setToken(token); // token'ı ayarlayın
    setIsAuthenticated(true);
    router
      .push("/main")
      .then(() => console.log("Navigated to main"))
      .catch((err) => console.error("Navigation error:", err));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null); // token'ı kaldırın
    setIsAuthenticated(false);
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
