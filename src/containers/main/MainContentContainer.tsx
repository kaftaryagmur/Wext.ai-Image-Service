import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/router";
import MainContent from "@/components/main/MainContent";

const MainContentContainer = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [photos, setPhotos] = useState<any[]>([]);

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSearch = (newPhotos: any[]) => {
    setPhotos([...newPhotos]); // spread operatörüyle array kopyası oluşturup setPhotos'a geçiyoruz
  };


  if (authLoading) return null;
  if (!isAuthenticated) return null;

  return (
    <Box>
      <MainContent onSearch={handleSearch} photos={photos} />
    </Box>
  );
};

export default MainContentContainer;
