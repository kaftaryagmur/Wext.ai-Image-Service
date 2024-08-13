import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/Header";
import SearchResults from "@/components/SearchResults";
import SelectedPhotosContainer from "@/containers/SelectedPhotosContainer";
import { useAuth } from "@/components/AuthProvider";
import LoadingScreen from "./LoadingScreen";
import Head from "next/head";

interface MainContentProps {
  onSearch: (keywords: string[]) => void;
  searchKeywords: string[];
}

const MainContent: React.FC<MainContentProps> = ({
  onSearch,
  searchKeywords,
}) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [selectedPhotos, setSelectedPhotos] = useState<any[]>([]);

  useEffect(() => {
    console.log("Search Keywords:", searchKeywords);
    console.log("Selected Photos:", selectedPhotos);
  }, [searchKeywords, selectedPhotos]);

  const handleSelectedPhotosChange = (photos: any[]) => {
    setSelectedPhotos(photos);
  };

  const handleSearch = (keywords: string[]) => {
    console.log("Handle Search Triggered with Keywords:", keywords);
    onSearch(keywords);
  };

  if (authLoading) return <LoadingScreen />;
  if (!isAuthenticated) return null;

  return (
    <Flex direction="column" height="100vh">
      <Head><title>Main</title></Head>
      <Header onSearch={handleSearch} />
      <Box flex="1" display="flex">
        {searchKeywords.length > 0 ? (
          <>
            <SearchResults
              keywords={searchKeywords}
              onSelectedPhotosChange={handleSelectedPhotosChange}
            />
            {selectedPhotos.length > 0 && (
              <SelectedPhotosContainer selectedPhotos={selectedPhotos} />
            )}
          </>
        ) : (
          <Box flex="1" display="flex" alignItems="center" justifyContent="center">
            <p>No search results yet. Please enter keywords to search.</p>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default MainContent;
