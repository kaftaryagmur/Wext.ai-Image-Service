import React from "react";
import { Box, Text, Button, Image } from "@chakra-ui/react";

const EmptyState: React.FC<{ onUpload: () => void }> = ({ onUpload }) => {
  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      bg="#f0f4f8"
      minH="200px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Image
        src="/path/to/placeholder-image.png"
        alt="Placeholder"
        boxSize="100px"
        mb={4}
      />
      <Text fontSize="lg" mb={4} textAlign="center" color="#40475c">
        No photos selected. Please upload photos to display here.
      </Text>
      <Button colorScheme="blue" onClick={onUpload}>
        Upload Photos
      </Button>
    </Box>
  );
};

export default EmptyState;
