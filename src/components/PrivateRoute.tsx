// components/PrivateRoute.tsx
import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "../components/AuthProvider";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return <>{children}</>;
};

export default PrivateRoute;
