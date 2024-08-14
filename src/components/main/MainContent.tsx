import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Header from "./Header";
import SearchResults from "./SearchResults";
import SelectedPhotosContainer from "../../containers/main/SelectedPhotosContainer";
import { useAuth } from "../AuthProvider";
import LoadingScreen from "../LoadingScreen";
import Head from "next/head";

interface MainContentProps {
  onSearch: (photos: any[]) => void;
  photos: any[]; // Gelen fotoğraf verilerini tutacak
}

const MainContent: React.FC<MainContentProps> = ({ onSearch, photos }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [selectedPhotos, setSelectedPhotos] = useState<any[]>([]);

  const handleSelectedPhotosChange = (photos: any[]) => {
    setSelectedPhotos(photos);
  };

  const handleSearch = (photos: any[]) => {
    onSearch(photos);
  };

  if (authLoading) return <LoadingScreen />;
  if (!isAuthenticated) return null;


  return (
    <Flex direction="column" height="100vh">
      <Head>
        <title>Main</title>
      </Head>
      <Header onSearch={handleSearch} />
      <Box flex="1" display="flex" position="relative">
        {photos.length > 0 ? (
          <>
            <Box position="relative" zIndex={1} flex="1">
              <SearchResults
                photos={photos} // Artık `photos` prop'u ile çalışıyor
                onSelectedPhotosChange={handleSelectedPhotosChange}
              />
            </Box>
            {selectedPhotos.length > 0 && (
              <SelectedPhotosContainer selectedPhotos={selectedPhotos} />
            )}
          </>
        ) : (
          <Box
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
              width="100%"
              bgImage="url('/images/background.png')"
              bgSize="cover"
              bgPosition="center"
              opacity={0.4}
              position="absolute"
              zIndex={-1}
            />
            <Box
              zIndex={1}
              p={8}
              bg="rgba(201, 182, 200, 0.7)"
              borderRadius="md"
              boxShadow="lg"
              maxWidth="600px"
              textAlign="center"
            >
              <Text fontWeight="bold">
                No search results yet. Please upload a CSV file to search.
              </Text>
            </Box>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default MainContent;
