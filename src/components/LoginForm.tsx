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
  useDisclosure
} from "@chakra-ui/react";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { BeatLoader } from "react-spinners";

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
  errorMessage?: string;
}

const LoginForm = ({ onSubmit, errorMessage }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(username, password);
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      setLoading(false);
    }
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

      {/* Sol Taraf: Tanıtım Görseli */}
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
        <VStack spacing={4} align="stretch" width="100%" maxWidth="600px">
          <Heading as="h2" size="lg" mb={10} textAlign="center">
            <Flex
              direction="column"
              align="left"
              justify="center"
              height="100%"
              p={4}
            >
              <Link href="/login" passHref>
                <Flex align="center" mb={4}>
                  <Image src="/favicon.ico" alt="Logo" boxSize="50px" mr={4} />
                  <Heading as="h2" fontSize="26px" color="#40475c">
                    Wext AI Image Service
                  </Heading>
                </Flex>
              </Link>
              <Text
                fontSize="md"
                textAlign="left"
                color="gray.400"
                fontWeight="400"
                pt={5}
              >
                Please sign-in to your account and continue to the dashboard.
              </Text>
            </Flex>
          </Heading>
          <form style={{ paddingRight: '10px', paddingLeft: '10px' }} onSubmit={handleSubmit}>
            <Stack spacing={8}>
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
              <Button
                colorScheme="blue"
                width="full"
                type="submit"
                isLoading={loading}
                loadingText="Logging in..."
                spinner={<BeatLoader size={8} color="white" />}
              >
                {loading ? '' : 'Login'}
              </Button>
            </Stack>
          </form>
        </VStack>
      </Box>
    </Box>
  );
};

export default LoginForm;
