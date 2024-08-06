import React, { useState } from 'react';
import { Button, Box, Flex, Text, Spinner } from '@chakra-ui/react';
import useAxios from '@/hooks/useAxios';
import { useAuth } from '@/components/AuthProvider';

const SelectedPhotosContainer = ({ selectedPhotos }: { selectedPhotos: any[] }) => {
  const axiosInstance = useAxios();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/savephoto/', { photos: selectedPhotos });
      console.log('Submitted photos:', selectedPhotos);
      alert('Photos saved successfully');
    } catch (error: any) {
      setError('Failed to save photos');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box p={4}>
      <Flex justifyContent="flex-end" mt={4}>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

export default SelectedPhotosContainer;
