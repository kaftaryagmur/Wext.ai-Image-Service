import { Input, Box, Button } from '@chakra-ui/react';
import { ChangeEvent, FormEvent, useState, useCallback } from 'react';
import { debounce } from 'lodash';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  //  sunucuya gereksiz isteklerin gönderilmesini engellemek için debouncing
  const debouncedSearch = useCallback(debounce((searchTerm: string) => {
    onSearch(searchTerm);
  }, 300), [onSearch]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    if (value.trim() === '') {
      // boşsa istek gönerme
      return;
    }
    debouncedSearch(value); //debounced fonksiyon
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} display="flex" alignItems="center" flex="1" mx={4}>
      <Input
        aria-label="Search photos"
        padding="8px"
        fontFamily="sans-serif"
        placeholder="Search..."
        bg="white"
        border="5px solid teal"
        borderRadius="15px"
        width="100%"
        _hover={{ borderColor: "green.400" }}
        _focus={{ borderColor: "blue.400", boxShadow: "outline" }}
        value={query}
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="solid"
        size="md"
        ml={2}
        borderRadius="full"
        _hover={{ bg: "teal.600" }}
        colorScheme="blue"
        width="auto"
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
