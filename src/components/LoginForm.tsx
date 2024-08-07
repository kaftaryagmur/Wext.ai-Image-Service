import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Image,
  Heading,
  Flex,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
  errorMessage?: string;
}

const LoginForm = ({ onSubmit, errorMessage }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  const leftWidth = useBreakpointValue({ base: "100%", md: "60%" });
  const rightWidth = useBreakpointValue({ base: "100%", md: "40%" });

  return (
    <Box
      display="flex"
      height="100vh"
      flexDirection={{ base: "column", md: "row" }}
    >
      <Head>
        <title>Login</title>
      </Head>

      {/* Sol Taraf: Logo ve Tanıtım Görseli */}
      <Box
        flexBasis={leftWidth}
        bg="#e7ecf8"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={10}
      >
        <Image
          src="https://wext.ai/html/assets/images/screens/hero-illustration.webp"
          alt="Hero Illustration"
          objectFit="contain"
          height="60%"
          width="60%"
        />
      </Box>

      {/* Sağ Taraf: Giriş Formu */}
      <Box
        flexBasis={rightWidth}
        bg="#ffffff"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={10}
      >
        <VStack spacing={4} align="stretch" width="100%" maxWidth="400px">
          <Heading as="h2" size="lg" mb={7} textAlign="center">
            <Flex
              direction="column"
              align="center"
              justify="center"
              height="100%"
              p={4}
            >
              <Link href="/login" passHref>
                <Flex align="center" mb={4}>
                  <Image src="/favicon.ico" alt="Logo" boxSize="44px" mr={4} />
                  <Heading as="h2" fontSize="30px">
                    Wext AI Image Service
                  </Heading>
                </Flex>
              </Link>
              <Text fontSize="sm" textAlign="left" color="gray.400" fontWeight="100">
                Please sign-in to your account and continue to the dashboard.
              </Text>
            </Flex>
          </Heading>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="●●●●●●●●"
                  required
                />
              </FormControl>
              {errorMessage && <Text color="red.500">{errorMessage}</Text>}
              <Button colorScheme="blue" width="full" type="submit">
                Sign In
              </Button>
            </Stack>
          </form>
        </VStack>
      </Box>
    </Box>
  );
};

export default LoginForm;
