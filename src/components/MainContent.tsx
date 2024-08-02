import { useEffect, useState } from "react";
import { Box, Image, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { fetchPhotos } from "../api/photos";
import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/router";

interface MainContentProps {
  searchQuery: string;
}

const MainContent = ({ searchQuery }: MainContentProps) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (searchQuery) {
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

      loadPhotos();
    }
  }, [isAuthenticated, searchQuery, router]);

  if (!isAuthenticated) return null;

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
