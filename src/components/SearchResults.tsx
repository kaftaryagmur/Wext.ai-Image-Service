import { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Image,
  Spinner,
  Text,
  Checkbox,
  Button,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";

interface SearchResultsProps {
  keywords: string[];
}

const SearchResults = ({ keywords }: SearchResultsProps) => {
  const [images, setImages] = useState<{ [key: string]: string[] }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token"); // Token'ı localStorage'dan alın
        const response = await axios.post(
          "http://192.168.5.103:8000/api/getphotos/",
          {
            queries: keywords,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Yetkilendirme başlığını ekleyin
            },
          }
        );
        console.log("Fetched images:", response.data); // Backend'den gelen verileri loglayın
        setImages(response.data);
      } catch (err) {
        setError("Failed to fetch images");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (keywords.length > 0) {
      fetchImages();
    }
  }, [keywords]);

  const handlePhotoSelect = (imgUrl: string) => {
    setSelectedPhotos((prevSelected) =>
      prevSelected.includes(imgUrl)
        ? prevSelected.filter((photo) => photo !== imgUrl)
        : [...prevSelected, imgUrl]
    );
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token"); // Token'ı localStorage'dan alın
      await axios.post(
        "http://192.168.5.103:8000/api/saveselectedphoto/",
        { photos: selectedPhotos },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Yetkilendirme başlığını ekleyin
          },
        }
      );
      alert("Photos saved successfully");
    } catch (err) {
      setError("Failed to save photos");
    }
  };

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box p={4}>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {Object.keys(images).map((keyword) => (
          <Box
            key={keyword}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            position="relative"
            p={2}
          >
            {Array.isArray(images[keyword]) &&
              images[keyword].map(
                (
                  imgUrl,
                  index // Array check eklendi
                ) => (
                  <Box key={index} position="relative" mb={2}>
                    <Image
                      src={imgUrl}
                      alt={`${keyword} image`}
                      borderRadius="md"
                      boxSize="250px"
                      objectFit="cover"
                      onClick={() => handlePhotoSelect(imgUrl)}
                    />
                    <Checkbox
                      position="absolute"
                      bottom="5px"
                      right="5px"
                      colorScheme="teal"
                      size="lg"
                      isChecked={selectedPhotos.includes(imgUrl)}
                      onChange={() => handlePhotoSelect(imgUrl)}
                    />
                  </Box>
                )
              )}
          </Box>
        ))}
      </SimpleGrid>
      <Flex justifyContent="flex-end" mt={4}>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

export default SearchResults;
