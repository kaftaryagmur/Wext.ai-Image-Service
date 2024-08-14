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
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {photos.map((photo, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            position="relative"
            p={2}
          >
            <Text fontSize="md" fontWeight="bold" mb={2}>
              {photo.query}
            </Text>
            <Box position="relative" mb={2}>
              <Image
                src={photo.photo_url}
                alt={`${photo.query} image`}
                borderRadius="md"
                boxSize="250px"
                objectFit="cover"
                onClick={() => handlePhotoSelect(photo)}
                cursor="pointer"
                opacity={
                  selectedPhotos.some((p) => p.photo_url === photo.photo_url)
                    ? 0.6
                    : 1
                }
                _hover={{ opacity: 0.8 }}
              />
              <Checkbox
                position="absolute"
                bottom="5px"
                right="5px"
                colorScheme="teal"
                size="lg"
                isChecked={selectedPhotos.some(
                  (p) => p.photo_url === photo.photo_url
                )}
                onChange={() => handlePhotoSelect(photo)}
              />
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SearchResults;
