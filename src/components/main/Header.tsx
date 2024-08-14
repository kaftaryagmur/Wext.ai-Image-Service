import { Box, Flex, Button, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import SearchBar from "./SearchBar";

interface HeaderProps {
  onSearch: (keywords: string[]) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  // Breakpoint kullanarak fontSize ve button size'ı değiştirebilirsiniz
  const fontSize = useBreakpointValue({ base: "md", md: "lg" });
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
  const flexDirection = useBreakpointValue({ base: "column", md: "row" }) as "column" | "row"; 

  return (
    <Box bg="#e7ecf8" p={4} boxShadow="md">
      <Flex
        align="center"
        maxW="1200px"
        mx="auto"
        px={4}
        direction={flexDirection} // Mobilde dikey, daha geniş ekranlarda yatay hizalama
        justify="space-between" 
        wrap="wrap" // İçerik sarmalı
      >
        <Flex align="center" mb={{ base: 4, md: 0 }}>
          <Image
            src="/favicon.ico"
            alt="Logo"
            boxSize={useBreakpointValue({ base: "40px", md: "50px" })}
            objectFit="contain"
            mr={3}
          />
          <Text fontSize={fontSize} fontWeight="bold" color="#40475c">
            Wext AI
          </Text>
        </Flex>

        {/* Arama Çubuğu */}
        <Box flex="1" 
         mb={{ base: 4, md: 0 }} width={{ base: "100%", md: "auto" }}
         display="flex"
         justifyContent="center">
          <SearchBar onSearch={onSearch} />
        </Box>

        {/* Çıkış Butonu */}
        <Button
          variant="solid"
          size={buttonSize}
          borderRadius="full"
          _hover={{ bg: "teal.600" }}
          onClick={handleLogout}
          colorScheme="blue"
        >
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
