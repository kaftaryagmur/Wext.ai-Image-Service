// src/pages/index.tsx
import {
  Button,
  Container,
  Heading,
  VStack,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Head from "next/head";

const HomePage = () => {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>Wext AI Image Service</title>{" "}
        {/* Sayfa başlığını buradan ayarlayın */}
        <meta
          name="description"
          content="Wext.AI Image Service - With our visual search service, quickly access all the photos you
            are looking for and use them in your projects."
        />
      </Head>
      <Box
        bg="gray.50"
        minH="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={5}
      >
        <Image
          src="/wext-ai-logo.svg" // Logonuzu buraya ekleyin
          alt="Logo"
          boxSize="250px"
          mb={6}
        />
        <VStack spacing={4} align="center">
          <Heading as="h1" size="2xl" mb={4}>
            Wext.AI Image Service
          </Heading>
          <Text fontSize="lg" color="gray.600" textAlign="center" mb={6}>
            With our visual search service, quickly access all the photos you
            are looking for and use them in your projects.
          </Text>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={handleLoginRedirect}
            borderRadius="full"
            _hover={{ bg: "blue.600" }}
          >
            Get Started
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default HomePage;
