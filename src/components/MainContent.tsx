import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/Header";
import SearchResults from "@/components/SearchResults";
import SelectedPhotosContainer from "@/containers/SelectedPhotosContainer";
import EmptyState from "@/components/EmptyState";
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
  const [showEmptyState, setShowEmptyState] = useState<boolean>(true);

  useEffect(() => {
    console.log("Search Keywords:", searchKeywords);
    console.log("Selected Photos:", selectedPhotos);
    console.log("Show Empty State:", showEmptyState);
    
    if (searchKeywords.length === 0 && selectedPhotos.length === 0) {
      setShowEmptyState(true);
    } else {
      setShowEmptyState(false);
    }
  }, [searchKeywords, selectedPhotos]);

  const handleSelectedPhotosChange = (photos: any[]) => {
    setSelectedPhotos(photos);
  };

  const handleSearch = (keywords: string[]) => {
    console.log("Handle Search Triggered with Keywords:", keywords);
    onSearch(keywords);
    if (keywords.length > 0) {
      setShowEmptyState(false);
    }
  };

  if (authLoading) return <LoadingScreen />;
  if (!isAuthenticated) return null;

  return (
    <Flex direction="column" height="100vh">
      <Head><title>Main</title></Head>
      <Header onSearch={handleSearch} />
      <Box flex="1" display="flex">
        {showEmptyState ? (
          <EmptyState />
        ) : (
          <>
            {searchKeywords.length > 0 && (
              <SearchResults
                keywords={searchKeywords}
                onSelectedPhotosChange={handleSelectedPhotosChange}
                setShowEmptyState={setShowEmptyState} // Bu fonksiyonu prop olarak geçiriyoruz
              />
            )}
            {selectedPhotos.length > 0 && (
              <SelectedPhotosContainer selectedPhotos={selectedPhotos} />
            )}
          </>
        )}
      </Box>
    </Flex>
  );
};

export default MainContent;
