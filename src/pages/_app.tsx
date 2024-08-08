import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "../components/AuthProvider";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";

const publicRoutes = ["/login"];

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  styles: {
    global: {
      'html, body': {
        scrollbarWidth: 'thin', // Firefox için ince scrollbar
        scrollbarColor: '#009eff #f0f0f0', // Scrollbar rengi ve track rengi
      },
      '::-webkit-scrollbar': {
        width: '12px', // Scrollbar genişliği
      },
      '::-webkit-scrollbar-track': {
        background: '#f0f0f0', // Scrollbar track rengi
        borderRadius: '10px', // Köşe yuvarlatma
      },
      '::-webkit-scrollbar-thumb': {
        background: '#009eff', // Scrollbar rengi
        borderRadius: '10px', // Köşe yuvarlatma
        border: '3px solid #f0f0f0', // Track ile scrollbar arasındaki boşluk
      },
      '@keyframes slideUp': {
        '0%': {
          transform: 'translateY(100%)',
          opacity: 0,
        },
        '100%': {
          transform: 'translateY(0)',
          opacity: 1,
        },
      },
      '.slide-up': {
        animation: 'slideUp 1s ease-out',
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

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    // Temizlik
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router]);

  const isPublicRoute = publicRoutes.includes(router.pathname);

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        {loading ? <LoadingScreen /> : <Component {...pageProps} />}
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
