import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import Header from "@/components/Header";
import SearchResults from "@/components/SearchResults";
import SelectedPhotosContainer from "@/containers/SelectedPhotosContainer";
import { useAuth } from "@/components/AuthProvider";

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

  if (authLoading) return <Text>Loading...</Text>;
  if (!isAuthenticated) return null;

  return (
    <Box>
      <Header onSearch={onSearch} />
      {searchKeywords.length > 0 && (
        <>
          <SearchResults
            keywords={searchKeywords}
            onSelectedPhotosChange={handleSelectedPhotosChange}
          />
        </>
      )}
      {selectedPhotos.length > 0 && (
        <SelectedPhotosContainer selectedPhotos={selectedPhotos} />
      )}
    </Box>
  );
};

export default MainContent;
