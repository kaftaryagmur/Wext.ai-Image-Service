import { Box } from "@chakra-ui/react";
import Header from "../components/Header";
import MainContent from "../components/MainContent";

const MainPage = () => {
  return (
    <Box>
      <Header />
      <MainContent searchQuery={""} />
    </Box>
  );
};

export default MainPage;
