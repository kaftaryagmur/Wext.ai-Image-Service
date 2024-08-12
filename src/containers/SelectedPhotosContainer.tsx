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
} from "@chakra-ui/react";
import useAxios from "@/hooks/useAxios";
import EmptyState from "@/components/EmptyState";

const SelectedPhotosContainer = ({
  selectedPhotos,
}: {
  selectedPhotos: any[];
}) => {
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/savephoto/", {
        photos: selectedPhotos,
      });

      console.log("Submitted photos:", selectedPhotos);
      alert("Photos saved successfully");
    } catch (error: any) {
      setError("Failed to save photos. Please try again.");
      console.error("Error submitting photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = () => {
    alert("Redirect to upload photos");
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
    >
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Text color="red.500" textAlign="center" fontSize="lg">
          {error}
        </Text>
      ) : selectedPhotos.length === 0 ? (
        <EmptyState onUpload={handleUpload} />
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
                width="150px" // Bileşenin genişliği
                height="150px" // Bileşenin yüksekliği
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
          <Flex direction="column" align="flex-end">
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              isDisabled={selectedPhotos.length === 0}
              _hover={{ bg: "blue.600" }}
              _active={{ bg: "blue.700" }}
            >
              Submit
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default SelectedPhotosContainer;
