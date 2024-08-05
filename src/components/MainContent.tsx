import { useEffect, useState } from "react";
import { Box, SimpleGrid, Image, Text } from "@chakra-ui/react";
import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/router";
import Header from "../components/Header";
import SearchResults from "../components/SearchResults";

interface MainContentProps {
  onSearch: (keywords: string[]) => void;
  searchKeywords: string[];
}

const MainContent = ({ onSearch, searchKeywords }: MainContentProps) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [photos, setPhotos] = useState<string[]>([
    "https://via.placeholder.com/250",
    "https://via.placeholder.com/250",
    "https://via.placeholder.com/250",
    "https://via.placeholder.com/250",
    "https://via.placeholder.com/250",
    "https://via.placeholder.com/250"
  ]);

  useEffect(() => {
    if (authLoading) return;

    console.log("isAuthenticated:", isAuthenticated);

    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) return <Text>Loading...</Text>;
  if (!isAuthenticated) return null;

  return (
    <Box>
      <Header onSearch={onSearch} />
      {searchKeywords.length > 0 && <SearchResults keywords={searchKeywords} />}
      {searchKeywords.length === 0 && (
        <Box p={4}>
          <SimpleGrid columns={[1, 2, 3]} spacing={4}>
            {photos.map((photo, index) => (
              <Image
                key={index}
                src={photo}
                alt={`Photo ${index}`}
                borderRadius="md"
                boxSize="250px"
                objectFit="cover"
              />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  );
};

export default MainContent;
