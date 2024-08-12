import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const EmptyState: React.FC = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgImage="url('/images/background.png')" // Uygulama arkaplanı
      bgSize="cover"
      bgPosition="center"
      opacity={0.5} // Opaciti'si düşük arka plan
    >
      <Text fontSize="xl" color="black.800" fontWeight="bolder">
        Welcome to the Module! Please upload a CSV file to get started.
      </Text>
    </Box>
  );
};

export default EmptyState;
