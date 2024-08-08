import React, { useState, useEffect } from "react";
import { Button, Box, Flex, Text, Spinner } from "@chakra-ui/react";
import useAxios from "@/hooks/useAxios";
import { useAuth } from "@/components/AuthProvider";
import EmptyState from "@/components/EmptyState";

const SelectedPhotosContainer = ({
  selectedPhotos,
}: {
  selectedPhotos: any[];
}) => {
  const axiosInstance = useAxios();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false); // Başlangıçta false
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
      setError("Failed to save photos");
      console.error("Error submitting photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = () => {
    // Fotoğraf yükleme veya yükleme sayfasına yönlendirme mantığı
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
        <Flex direction="column" align="flex-end">
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isDisabled={selectedPhotos.length === 0} // Fotoğraf seçilmediyse butonu devre dışı bırak
            _hover={{ bg: "blue.600" }}
            _active={{ bg: "blue.700" }}
          >
            Submit
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default SelectedPhotosContainer;
