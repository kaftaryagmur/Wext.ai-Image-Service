import { Input, Box, IconButton, Flex, Spinner, Text, Button } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from 'axios';
import { useAuth } from "@/components/AuthProvider";

interface SearchBarProps {
  onSearch: (queries: string[]) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      setLoading(true);
      setError(undefined);
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://192.168.5.103:8000/api/csvfileupload/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
        onSearch(response.data.queries);
        setFile(null); // Dosyayı temizle
      } catch (err) {
        setError('Failed to upload file');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please select a CSV file");
    }
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
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        display="none"
        id="csvFileInput"
      />
      <Button
        as="label"
        htmlFor="csvFileInput"
        bg="teal.500"
        color="white"
        borderRadius="8px"
        padding="8px"
        marginRight="8px"
        cursor="pointer"
        _hover={{ bg: "#009eff" }}
      >
        {file ? file.name : "Upload CSV"}
      </Button>
      <IconButton
        aria-label="Search"
        icon={loading ? <Spinner size="lg" /> : <SearchIcon />}
        variant="outline"
        colorScheme="teal"
        padding="8px"
        ml={6}
        type="submit"
        isDisabled={loading}
        _hover={{ bg: "#009eff", color: "white" }}
        _active={{ bg: "#003764", color: "white" }}
      />
      {error && (
        <Flex align="center" ml={4}>
          <Text color="red.500">{error}</Text>
        </Flex>
      )}
    </Box>
  );
};

export default SearchBar;
