import React, { useState, useEffect } from "react";
import { Button, Box, Flex, Text, Spinner, SimpleGrid, Image, Checkbox } from "@chakra-ui/react";
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
  const [photos, setPhotos] = useState<any[]>(selectedPhotos); // selectedPhotos'u başlangıç state'i olarak ayarladık

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      await axiosInstance.post("/savephoto/", {
        photos: photos,
      });
      console.log("Submitted photos:", photos);
      alert("Photos saved successfully");
    } catch (error: any) {
      setError("Failed to save photos. Please try again.");
      console.error("Error submitting photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    try {
      const response = await axiosInstance.post("/api/upload", { /* payload burada */ });
      setPhotos(response.data.photos); // Yüklenen fotoğrafları güncelle
      alert("Photos uploaded successfully");
    } catch (error) {
      console.error("Error uploading photos:", error);
      alert("Error uploading photos");
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
    >
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Text color="red.500" textAlign="center" fontSize="lg">
          {error}
        </Text>
      ) : photos.length === 0 ? ( // Eğer photos state'i boşsa EmptyState göster
        <EmptyState onUpload={handleUpload} />
      ) : (
        <>
          <SimpleGrid columns={[3, 4, 5]} spacing={4} mb={4}>
            {photos.map((photo, index) => (
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
                  isChecked={photos.some(
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
              isDisabled={photos.length === 0}
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
