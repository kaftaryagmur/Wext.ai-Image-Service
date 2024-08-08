// src/pages/index.tsx
import { Button, VStack, Text, Image, Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// MotionBox for animation
const MotionBox = motion(Box);

const HomePage = () => {
  const router = useRouter();
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  useEffect(() => {
    const observer1 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible1(true);
        } else {
          setIsVisible1(false);
        }
      },
      { threshold: 0.1 }
    );

    const observer2 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible2(true);
        } else {
          setIsVisible2(false);
        }
      },
      { threshold: 0.1 }
    );

    if (ref1.current) {
      observer1.observe(ref1.current);
    }
    if (ref2.current) {
      observer2.observe(ref2.current);
    }

    return () => {
      if (ref1.current) {
        observer1.unobserve(ref1.current);
      }
      if (ref2.current) {
        observer2.unobserve(ref2.current);
      }
    };
  }, []);

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
        <Image
          src="/wext-ai-logo.svg" // Logonuzu buraya ekleyin
          alt="Logo"
          boxSize="250px"
          mb={6}
        />
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
        </VStack>
      </Box>
  
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        <MotionBox
          ref={ref1}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible1 ? 1 : 0, y: isVisible1 ? 0 : 50 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          minHeight="100%"
          width="100%"
          p={10}
          mt={10}
        >
          <Image
            src="/images/0.png" 
            alt="Instruction1"
            boxSize="50%"
            objectFit="contain"
            boxShadow="dark-lg"
            borderRadius={10}
          />
        </MotionBox>

        <MotionBox
          ref={ref2}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible2 ? 1 : 0, y: isVisible2 ? 0 : 50 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          minHeight="100%"
          width="100%"
          p={10}
          mt={10}
        >
          <Image
            src="/images/1.png" 
            alt="Instruction1"
            boxSize="50%"
            objectFit="contain"
            boxShadow="dark-lg"
            borderRadius={10}
          />
        </MotionBox>
      </Box>
    </>
  );
};

export default HomePage;
