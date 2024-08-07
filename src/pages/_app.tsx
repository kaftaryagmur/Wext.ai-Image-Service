// src/_app.tsx
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "../components/AuthProvider";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

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
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isPublicRoute = publicRoutes.includes(router.pathname);

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
