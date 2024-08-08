import { Box, Center, Spinner, Text } from "@chakra-ui/react";

const LoadingScreen = () => {
  return (
    <Center height="100vh" bg="gray.100">
      <Box textAlign="center">
        <Spinner size="xl" color="blue.500" />
        <Text mt={4} fontSize="lg" color="gray.600">Loading...</Text>
      </Box>
    </Center>
  );
};

export default LoadingScreen;
