import {
  Input,
  Box,
  IconButton,
  Flex,
  Spinner,
  Text,
  Button,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useAuth } from "@/components/AuthProvider";

interface SearchBarProps {
  onSearch: (queries: string[]) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    maxFiles: 1,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      setLoading(true);
      setError(undefined);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://192.168.5.103:8000/api/csvfileupload/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        onSearch(response.data.queries);
        setFile(null); // Dosyayı temizle
      } catch (err) {
        setError("Failed to upload file");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please select a CSV file!");
    }
  };

  const dropzoneBg = useColorModeValue("#f0f4f8", "#2d3748");
  const dropzoneHoverBg = useColorModeValue("#e1e5e9", "#4a5568");

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      display="flex"
      alignItems="center"
      borderRadius="8px"
      bg="#003764"
      padding="18px"
      margin="15px"
      width={{ base: "90%", sm: "70%", md: "70%" }}
      _hover={{ bg: "#004080" }}
      _focusWithin={{ bg: "#004080" }}
    >
      <VStack
        {...getRootProps()}
        bg={dropzoneBg}
        padding="8px"
        borderRadius="8px"
        borderWidth="2px"
        borderColor={file ? "green.500" : "gray.300"}
        borderStyle={file ? "solid " : "dashed"}
        _hover={{ bg: dropzoneHoverBg }}
        width="100%"
        textAlign="center"
      >
        <input {...getInputProps()} />
        <Text color="gray">
          {file ? file.name : "Click to choose a file or drag it here."}
        </Text>
      </VStack>
      <IconButton
        aria-label="Search"
        icon={loading ? <Spinner size="lg" /> : <SearchIcon />}
        variant="solid"
        colorScheme="teal"
        padding="8px"
        ml={2}
        type="submit"
        isDisabled={loading}
        _hover={{ bg: "teal.600", color: "white" }}
        _active={{ bg: "teal.700", color: "white" }}
      />
      {error && (
        <Flex align="center" ml={4}>
          <Text color="white" fontSize="sm">
            {error}
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default SearchBar;
