import { Box, Flex, Button, Image, Spacer } from "@chakra-ui/react";
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

  return (
    <Box bg="#e7ecf8" p={6} boxShadow="3px">
      <Flex align="center">
        <Box >
          <Image
            src="/favicon.ico"
            alt="Logo"
            boxSize="50px"
            objectFit="contain"
          />
          Wext.ai
        </Box>
        <Spacer />
        <SearchBar onSearch={onSearch} />
        <Spacer />
        <Button
          variant="solid"
          size="md"
          borderRadius="full"
          _hover={{ bg: "teal.600" }}
          onClick={handleLogout}
          colorScheme="blue"
          width="8%"
          type="submit"
        >
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
