import {
  Box,
  IconButton,
  Flex,
  Spinner,
  Text,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FormEvent, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { SearchIcon } from "@chakra-ui/icons";
import useAxios from "@/hooks/useAxios";

interface SearchBarProps {
  onSearch: (queries: string[]) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const axiosInstance = useAxios(); // useAxios hook'u kullanılıyor
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);
  const toast = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]); // Dosya seçildiğinde file state güncellenir
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] }, // Sadece CSV dosyalarına izin verilir
    maxFiles: 1, // Maksimum 1 dosya yüklenebilir
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      setLoading(true); // Yükleme başlıyor
      setError(undefined);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axiosInstance.post("/csvfileupload/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Search Keywords from Response:", response.data.queries);
        onSearch(response.data.queries); // Arama sonuçlarını üst bileşene gönderiyoruz

        toast({
          title: "File uploaded successfully.",
          description: `File: ${file.name} has been processed.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        setFile(null); // Dosya yüklemesi başarılı, file state sıfırlanır
      } catch (err) {
        setError("Failed to upload file");
        console.error("Error:", err);
        toast({
          title: "File upload failed.",
          description: "There was an error uploading your file.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false); // Yükleme tamamlandı
      }
    } else {
      setError("Please select a CSV file!"); // Dosya seçilmediyse hata mesajı
      toast({
        title: "No file selected.",
        description: "Please select a CSV file to upload.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const dropzoneBg = useColorModeValue("#f0f4f8", "#2d3748");
  const dropzoneHoverBg = useColorModeValue("#e1e5e9", "#4a5568");

  return (
    <Box
      as="form"
      onSubmit={handleSubmit} // Form submit işlemi
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
        borderStyle={file ? "solid" : "dashed"}
        _hover={{ bg: dropzoneHoverBg }}
        width="100%"
        textAlign="center"
      >
        <input {...getInputProps()} /> {/* Dosya girişi */}
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
        isDisabled={loading} // Yükleme sırasında buton devre dışı bırakılır
        _hover={{ bg: "teal.600", color: "white" }}
        _active={{ bg: "teal.700", color: "white" }}
      />
      {error && ( // Hata mesajı görüntülenir
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
