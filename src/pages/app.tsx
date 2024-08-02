// pages/_app.tsx
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../components/AuthProvider";
import PrivateRoute from "../components/PrivateRoute";
import { useRouter } from "next/router";
import "../styles/globals.css";
import type { AppProps } from "next/app";

const publicRoutes = ["/login"];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isPublicRoute = publicRoutes.includes(router.pathname);

  if (typeof window !== "undefined") {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwYXNzd29yZCIsIm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MzU2ODk2MDB9.0C6tNSge9LJ1uK4vHX8FfM4Lr6-vskojLu9X6iUduIM"
    );
  }
  return (
    <ChakraProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
