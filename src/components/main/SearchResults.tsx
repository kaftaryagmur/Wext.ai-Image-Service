import { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Checkbox,
  Alert,
  AlertIcon,
  Badge,
  Flex,
} from "@chakra-ui/react";

interface Photo {
  photo_url: string;
  photographer: string;
  query: string;
}

interface SearchResultsProps {
  photos: Photo[]; // Fotoğrafların listesi, SearchBar'dan geliyor
  onSelectedPhotosChange: (photos: Photo[]) => void;
}

const SearchResults = ({
  photos,
  onSelectedPhotosChange,
}: SearchResultsProps) => {
  const [selectedPhotos, setSelectedPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    onSelectedPhotosChange(selectedPhotos);
  }, [selectedPhotos, onSelectedPhotosChange]);

  const handlePhotoSelect = (photo: Photo) => {
    setSelectedPhotos((prevSelected) =>
      prevSelected.some((p) => p.photo_url === photo.photo_url)
        ? prevSelected.filter((p) => p.photo_url !== photo.photo_url)
        : [...prevSelected, photo]
    );
  };

  if (photos.length === 0)
    return (
      <Alert status="info">
        <AlertIcon />
        No photos found.
      </Alert>
    );

  return (
    <Box p={4}>
      {selectedPhotos.length > 0 && (
        <Box mb={4} textAlign="right">
          <Badge colorScheme="teal">
            {selectedPhotos.length} photo(s) selected
          </Badge>
        </Box>
      )}
      <SimpleGrid columns={[1, 2, 3]} spacing={6} pb="248px">
        {photos.map((photo, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            position="relative"
            boxShadow="md"
            transition="transform 0.2s, box-shadow 0.2s"
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "lg",
            }}
          >
            <Image
              src={photo.photo_url}
              alt={`${photo.query} image`}
              borderRadius="md"
              width="100%"
              height="200px"
              objectFit="cover"
              cursor="pointer"
              onClick={() => handlePhotoSelect(photo)}
              opacity={
                selectedPhotos.some((p) => p.photo_url === photo.photo_url)
                  ? 0.6
                  : 1
              }
              _hover={{ opacity: 0.8 }}
            />
            <Checkbox
              position="absolute"
              top="5px"
              right="5px"
              colorScheme="teal"
              size="lg"
              isChecked={selectedPhotos.some(
                (p) => p.photo_url === photo.photo_url
              )}
              onChange={() => handlePhotoSelect(photo)}
            />
            <Box p={4}>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="lg" fontWeight="bold">
                  {photo.query}
                </Text>
                <Badge colorScheme="blue" variant="solid">
                  {photo.photographer}
                </Badge>
              </Flex>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SearchResults;
