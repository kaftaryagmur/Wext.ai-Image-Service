import styles from "../styles/header.module.css";
import { Box, Flex, Button, Image, Spacer } from "@chakra-ui/react";
import { useRouter } from "next/router";
import SearchBar from './SearchBar'; // Import the SearchBar component

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Oturum bilgilerini temizleme
    localStorage.removeItem("token"); // veya sessionStorage.removeItem("token");
    // Yönlendirme
    router.push("/");
  };

  const handleSearch = (query: string) => {
    // Arama işlevini burada işleyin
    console.log('Searching for:', query);
  };

  return (
    <Box bg="#e7ecf8" p={4} boxShadow="3px">
      <Flex align="center">
        {/* Logo */}
        <Box className={styles["logo"]}>
          <Image
            src="/favicon.ico"
            alt="Logo"
            boxSize="50px"
            objectFit="contain"
          /> Wext.ai
        </Box>

        {/* Spacer */}
        <Spacer />

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Spacer */}
        <Spacer />

        {/* Logout Button */}
        <Button
          variant="solid"
          size="md"
          borderRadius="full"
          _hover={{ bg: "teal.600" }}
          onClick={handleLogout}
          colorScheme="blue"
          width="full"
          type="submit"
          className={styles["btn-primary"]}
        >
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
