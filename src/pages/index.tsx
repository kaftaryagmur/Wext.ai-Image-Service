import { Button, VStack, Text, Image, Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Head from "next/head";
import HowToUse from "../components/HowToUse";
import { Link } from "react-scroll"; 
import ScrollToTopButton from "@/components/ScrollToUpButton";

const HomePage = () => {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>Wext AI Image Service</title>
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
        <Image src="/wext-ai-logo.svg" alt="Logo" boxSize="250px" mb={6} />
        <VStack spacing={4} align="center">
          <Heading as="h1" size="2xl" mb={4} textAlign="center">
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
          <Link to="how-to-use" smooth={true} duration={500}>
            <Button
              color="#6a4dff"
              borderColor="#6a4dff"
              variant="outline"
              size="lg"
              borderRadius="full"
              _hover={{ bg: "blue.200", color: "white" }}
            >
              How To Use
            </Button>
          </Link>
        </VStack>
      </Box>
      <Box id="how-to-use">
        <HowToUse />
      </Box>
      <ScrollToTopButton />
    </>
  );
};

export default HomePage;
