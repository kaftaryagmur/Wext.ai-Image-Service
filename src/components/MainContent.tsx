import { useEffect, useState } from "react";
import { Box, Image, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { fetchPhotos } from "../api/photos";

interface MainContentProps {
  searchQuery: string;
}

const MainContent = ({ searchQuery }: MainContentProps) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true);
      setError(undefined);
      try {
        const fetchedPhotos = await fetchPhotos(searchQuery);
        setPhotos(fetchedPhotos);
      } catch (error) {
        setError("Failed to fetch photos.");
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      loadPhotos();
    }
  }, [searchQuery]);

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box p={4}>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {photos.length > 0 ? (
          photos.map((photo, index) => (
            <Image
              key={index}
              src={photo}
              alt={`Photo ${index}`}
              borderRadius="md"
              boxSize="250px"
              objectFit="cover"
            />
          ))
        ) : (
          <Text>No photos found.</Text>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default MainContent;