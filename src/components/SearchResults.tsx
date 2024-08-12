import { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import useAxios from "@/hooks/useAxios";
import LoadingScreen from "./LoadingScreen";

interface SearchResultsProps {
  keywords: string[];
  onSelectedPhotosChange: (photos: any[]) => void;
}

interface Photo {
  photo_url: string;
  photographer: string;
  query: string;
}

const SearchResults = ({
  keywords,
  onSelectedPhotosChange,
}: SearchResultsProps) => {
  const [images, setImages] = useState<{ [key: string]: Photo[] }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<Photo[]>([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.post("/getphotos/", {
          queries: keywords,
        });

        const photosByQuery: { [key: string]: Photo[] } = {};
        response.data.forEach((photo: any) => {
          if (!photosByQuery[photo.query]) {
            photosByQuery[photo.query] = [];
          }
          photosByQuery[photo.query].push({
            photo_url: photo.photo_url,
            photographer: photo.photographer,
            query: photo.query,
          });
        });

        setImages(photosByQuery);
      } catch (err) {
        setError("Failed to fetch images");
        console.error("Error fetching images:", err);
      } finally {
        setLoading(false);
      }
    };

    if (keywords.length > 0) {
      fetchImages();
    }
  }, [keywords, axiosInstance]);

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

  if (loading) return <LoadingScreen />;
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
            borderColor="#c9b6fa"
          >
            {images[keyword].map((photo, index) => (
              <Box key={index} position="relative" mb={2}>
                <Image
                  src={photo.photo_url}
                  alt={`${keyword} image`}
                  borderRadius="md"
                  boxSize="250px"
                  objectFit="cover"
                  onClick={() => handlePhotoSelect(photo)}
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
            ))}
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SearchResults;
