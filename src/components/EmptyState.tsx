import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';

interface EmptyStateProps {
  onUpload?: () => void; // onUpload prop'unu ekliyoruz
}

const EmptyState: React.FC<EmptyStateProps> = ({ onUpload }) => {
  return (
    <Box
    zIndex={-1}
      flex="1"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgImage="url('/images/background.png')"
      bgSize="contain"
      bgPosition="center"
      bgRepeat="no-repeat"
      opacity={0.7}
      flexDirection="column" // Butonu alt alta yerleştirmek için flexDirection ekledik
    >
      <Text
        fontSize="2xl"
        color="#000000"
        fontWeight="extrabold"
        mb={4} // Butonla metin arasına boşluk ekledik
      >
        Please upload a CSV file to get started.
      </Text>
      {onUpload && (
        <Button onClick={onUpload} colorScheme="blue">
          Upload Photos
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
