import { Box, Heading, Text } from '@chakra-ui/react';

const MainContent = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      backgroundColor="gray.100"
    >
      <Box p={6} borderRadius="md" boxShadow="md" backgroundColor="white">
        <Heading>Welcome to the Main Page</Heading>
        <Text mt={4}>You are successfully logged in!</Text>
      </Box>
    </Box>
  );
};

export default MainContent;
