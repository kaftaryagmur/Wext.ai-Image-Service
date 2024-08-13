import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "../components/AuthProvider";
import LoadingScreen from "./LoadingScreen";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    // Yüklenme durumu gösterilebilir. Örneğin:
    return <LoadingScreen/>; 
  }

  if (!isAuthenticated) return null;
  return <>{children}</>;
};
export default PrivateRoute;