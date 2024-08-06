import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import Header from '@/components/Header';
import SearchResults from '@/components/SearchResults';
import SelectedPhotosContainer from '@/containers/SelectedPhotosContainer';
import { useAuth } from '@/components/AuthProvider';

const MainContent = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [searchKeywords, setSearchKeywords] = useState<string[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<any[]>([]);

  const handleSearch = (keywords: string[]) => {
    setSearchKeywords(keywords);
  };

  const handleSelectedPhotosChange = (photos: any[]) => {
    setSelectedPhotos(photos);
  };

  if (authLoading) return <Text>Loading...</Text>;
  if (!isAuthenticated) return null;

  return (
    <Box>
      <Header onSearch={handleSearch} />
      {searchKeywords.length > 0 && (
        <>
          <SearchResults
            keywords={searchKeywords}
            onSelectedPhotosChange={handleSelectedPhotosChange}
          />
        </>
      )}
      {selectedPhotos.length > 0 && <SelectedPhotosContainer selectedPhotos={selectedPhotos} />}
    </Box>
  );
};

export default MainContent;
