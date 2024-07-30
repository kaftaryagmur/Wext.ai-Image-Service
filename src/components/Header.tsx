// src/components/Header.tsx
import { Box, Flex, Input, Button, Spacer, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Oturum bilgilerini temizleme
    localStorage.removeItem("token"); // veya sessionStorage.removeItem("token");

    // Kullanıcıyı giriş sayfasına yönlendirme
    router.push("/");
  };

  return (
    <Box bg="gray.200" p={4} boxShadow="md">
      <Flex align="center">
        {/* Logo */}
        <Box>
          <Image
            src="/images/logo.png"
            alt="Logo"
            boxSize="50px"
            objectFit="contain"
          />
        </Box>

        {/* Spacer */}
        <Spacer />

        {/* Search Bar */}
        <Box flex="1" mx={4}>
          <Input
            placeholder="Search..."
            bg="white"
            border="2px solid teal"
            borderRadius="md"
            _hover={{ borderColor: "green.400" }}
            _focus={{ borderColor: "blue.400", boxShadow: "outline" }}
          />
        </Box>

        {/* Spacer */}
        <Spacer />

        {/* Logout Button */}
        <Button
          colorScheme="teal"
          variant="solid"
          size="md"
          borderRadius="full"
          _hover={{ bg: "teal.600" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
