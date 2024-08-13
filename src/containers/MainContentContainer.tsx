import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/router";
import MainContent from "../components/MainContent";

const MainContentContainer = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [searchKeywords, setSearchKeywords] = useState<string[]>([]);

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSearch = (keywords: string[]) => {
    setSearchKeywords(keywords);
  };

  if (authLoading) return null;
  if (!isAuthenticated) return null;

  return (
    <Box>
      
      <MainContent onSearch={handleSearch} searchKeywords={searchKeywords} />
    </Box>
  );
};

export default MainContentContainer;
