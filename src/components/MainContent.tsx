import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/Header";
import SearchResults from "@/components/SearchResults";
import SelectedPhotosContainer from "@/containers/SelectedPhotosContainer";
import EmptyState from "@/components/EmptyState";
import { useAuth } from "@/components/AuthProvider";
import LoadingScreen from "./LoadingScreen";

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

  const handleSelectedPhotosChange = (photos: any[]) => {
    setSelectedPhotos(photos);
  };

  if (authLoading) return <LoadingScreen/>;
  if (!isAuthenticated) return null;

  return (
    <Flex direction="column" height="100vh">
      <Header onSearch={onSearch} />
      <Box flex="1" display="flex">
        {searchKeywords.length === 0 && selectedPhotos.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {searchKeywords.length > 0 && (
              <SearchResults
                keywords={searchKeywords}
                onSelectedPhotosChange={handleSelectedPhotosChange}
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
