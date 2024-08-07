import { Box } from "@chakra-ui/react";
import Header from "../components/Header";
import MainContentContainer from "../containers/MainContentContainer";

const MainPage = () => {
  const handleSearch = (keywords: string[]) => {
    // Arama işlemini burada gerçekleştirin
    console.log("Arama kelimeleri:", keywords);
  };

  return (
    <Box>
      <Header onSearch={handleSearch} />
      <MainContentContainer />
    </Box>
  );
};

export default MainPage;
