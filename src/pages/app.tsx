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

  return (
    <ChakraProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
