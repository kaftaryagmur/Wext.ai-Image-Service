import styles from "../styles/header.module.css";
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
        <Box display="flex" alignItems="center" flex="1" mx={4}>
          <Input
          padding="8px"
            fontFamily="monospace"
            placeholder="Search..."
            bg="white"
            border="5px solid teal"
            borderRadius="15px"
            width="100%"
            _hover={{ borderColor: "green.400" }}
            _focus={{ borderColor: "blue.400", boxShadow: "outline" }
          }
          />
        </Box>

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
