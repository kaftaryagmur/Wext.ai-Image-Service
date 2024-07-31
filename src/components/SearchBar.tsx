import { Input, Box, IconButton } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState, useCallback } from "react";
import { debounce } from "lodash";
import { SearchIcon } from "@chakra-ui/icons";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState<string>(""); //kullanıcının arama terimi
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  // Sunucuya gereksiz isteklerin gönderilmesini engellemek için debouncing
  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      onSearch(searchTerm);
    }, 300),
    [onSearch]
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    if (value.trim() === "") {
      // Boşsa istek göndermeyi engelle
      return;
    }
    debouncedSearch(value); // Debounced fonksiyon
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(undefined);
    onSearch(query);
    setLoading(false);
  };

  const handleButtonClick = () => {
    setLoading(true);
    setError(undefined);
    onSearch(query);
    setLoading(false);
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      display="flex"
      alignItems="center"
      borderRadius="8px"
      bg="#2d4e69"
      padding="8px"
      margin="15px"
      width="50%"
      _hover={{ bg: "#009eff" }}
      _focusWithin={{ bg: "#009eff" }}
    >
      <Input
        aria-label="Search photos"
        placeholder="Search..."
        bg="white"
        border="none"
        borderRadius="8px"
        padding="8px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="60%"
        fontFamily="Poppins, sans-serif"
        _placeholder={{ color: "#aaa" }}
        _focus={{ borderColor: "transparent", boxShadow: "none" }}
        value={query}
        onChange={handleChange}
        flex="1" // Input genişliği otomatik ayarlansın
      />
      <IconButton
        aria-label="Search"
        icon={<SearchIcon />}
        variant="outline"
        colorScheme="teal"
        padding="8px"
        ml={6}
        onClick={handleButtonClick}
        _hover={{ bg: "#009eff", color: "white" }} // Hover efekti
        _active={{ bg: "#003764", color: "white" }} // Aktif durumda renkler
      />
    </Box>
  );
};

export default SearchBar;
