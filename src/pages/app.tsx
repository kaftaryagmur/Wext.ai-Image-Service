import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import PrivateRoute from "../components/PrivateRoute";
import { useRouter } from "next/router";

const publicRoutes = ["/login"];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isPublicRoute = publicRoutes.includes(router.pathname);

  return (
    <ChakraProvider>
      {isPublicRoute ? (
        <Component {...pageProps} />
      ) : (
        <PrivateRoute>
          <Component {...pageProps} />
        </PrivateRoute>
      )}
    </ChakraProvider>
  );
}

export default MyApp;
