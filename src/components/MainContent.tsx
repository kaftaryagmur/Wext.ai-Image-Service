import { Box, Heading, Text, VStack } from "@chakra-ui/react";

const MainContent = () => {
  return (
    <Box p={4}>
      <VStack spacing={4} align="start">
        <Heading as="h1" size="xl">
          Welcome to the Main Page
        </Heading>
        <Text fontSize="lg">
          This is a placeholder for the main content of your application. You
          can add more components, content, and styling here.
        </Text>
        <Text fontSize="md">
          Customize this section to suit the needs of your application. This
          could include user information, notifications, or any other relevant
          details.
        </Text>
      </VStack>
    </Box>
  );
};

export default MainContent;
