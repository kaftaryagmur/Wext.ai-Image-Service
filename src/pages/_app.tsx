import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "../components/AuthProvider";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  styles: {
    global: {
      "html, body": {
        scrollbarWidth: "thin",
        scrollbarColor: "#7daeff #f0f4ff", // Daha yumuşak renkler
      },
      "::-webkit-scrollbar": {
        width: "10px", // Biraz daha ince scrollbar
      },
      "::-webkit-scrollbar-track": {
        background: "#f0f4ff", // Track rengi daha yumuşak
        borderRadius: "20px", // Daha yuvarlak kenarlar
      },
      "::-webkit-scrollbar-thumb": {
        background: "#7daeff", // Scrollbar rengi daha yumuşak
        borderRadius: "20px", // Daha yuvarlak kenarlar
        border: "2px solid #f0f4ff", // Daha küçük bir boşluk
      },
      "@keyframes slideUp": {
        "0%": {
          transform: "translateY(100%)",
          opacity: 0,
        },
        "100%": {
          transform: "translateY(0)",
          opacity: 1,
        },
      },
      ".slide-up": {
        animation: "slideUp 1s ease-out",
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);
    const handleRouteChangeError = () => setLoading(false);

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    // Temizlik
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router]);

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        {loading ? <LoadingScreen /> : <Component {...pageProps} />}
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
