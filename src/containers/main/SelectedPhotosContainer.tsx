import React, { useState } from "react";
import {
  Button,
  Box,
  Flex,
  Text,
  Spinner,
  SimpleGrid,
  Image,
  Checkbox,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import useAxios from "@/hooks/useAxios";

const SelectedPhotosContainer = ({
  selectedPhotos,
}: {
  selectedPhotos: any[];
}) => {
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axiosInstance.post("/savephoto/", {
        photos: selectedPhotos,
      });
      setSuccess(true);
      
    } catch (error: any) {
      setError("Failed to save photos. Please try again.");
      console.error("Error submitting photos:", error);
    } finally {
      setLoading(false);
    }
  };

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
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      zIndex="1000"  // Bu kısım diğer içeriklerin üzerinde görünmesini sağlar
    >
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Alert status="error" mb={4}>
          <AlertIcon />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => setError(null)}
          />
        </Alert>
      ) : success ? (
        <Alert status="success" mb={4}>
          <AlertIcon />
          <AlertTitle>Thank you!</AlertTitle>
          <AlertDescription>Photos saved successfully.</AlertDescription>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => setSuccess(false)}
          />
        </Alert>
      ) : selectedPhotos.length === 0 ? (
        <Text color="gray.500" textAlign="center" fontSize="lg">
          No photos selected. Please select photos to submit.
        </Text>
      ) : (
        <>
          <SimpleGrid columns={[3, 4, 5]} spacing={4} mb={4}>
            {selectedPhotos.map((photo, index) => (
              <Box
                key={index}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                position="relative"
                width="150px"
                height="150px"
              >
                <Image
                  src={photo.photo_url}
                  alt={`Photo ${index}`}
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
                <Checkbox
                  position="absolute"
                  bottom="5px"
                  right="5px"
                  colorScheme="teal"
                  size="md"
                  isChecked={selectedPhotos.some(
                    (p) => p.photo_url === photo.photo_url
                  )}
                />
              </Box>
            ))}
          </SimpleGrid>
          <Flex direction="column" align="center">
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              isDisabled={selectedPhotos.length === 0}
              _hover={{ bg: "blue.600" }}
              _active={{ bg: "blue.700" }}
            >
              Submit Selected Photos
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default SelectedPhotosContainer;
