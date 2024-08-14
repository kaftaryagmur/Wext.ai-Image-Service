import { Box, Flex, Button, Image, Spacer, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import SearchBar from "./SearchBar";
import { useEffect } from "react";

interface HeaderProps {
  onSearch: (keywords: string[]) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };
  useEffect(() => {
    console.log("Header rendered");
  });
  return (
    <Box bg="#e7ecf8" p={4} boxShadow="md">
      <Flex
        align="center"
        maxW="1200px"
        mx="auto"
        px={4}
        justify="space-between" // Aligns children to the start and end
      >
        <Flex align="center">
          <Image
            src="/favicon.ico"
            alt="Logo"
            boxSize="50px"
            objectFit="contain"
            mr={3}
          />
          <Text fontSize="lg" fontWeight="bold" color="#40475c">
            Wext AI
          </Text>
        </Flex>

        {/* Arama Çubuğu */}
        <SearchBar onSearch={onSearch} />

        {/* Çıkış Butonu */}
        <Button
          variant="solid"
          size="md"
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
