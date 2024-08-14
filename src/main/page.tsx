import { Box } from "@chakra-ui/react";
import Header from "@/components//main/Header";
import MainContentContainer from "../containers/main/MainContentContainer";
import PrivateRoute from "../components/PrivateRoute";
import Head from "next/head";

const MainPage = () => {

  return (
    <Box>
      <Head>
        <title>Main</title>
      </Head>
      <PrivateRoute>
        {/* <Header onSearch={handleSearch} /> */}
        <MainContentContainer />
      </PrivateRoute>
    </Box>
  );
};

export default MainPage;
