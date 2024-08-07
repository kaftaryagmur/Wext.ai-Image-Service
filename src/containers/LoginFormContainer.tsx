import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../components/AuthProvider";
import LoginForm from "@/components/LoginForm";
import { Box, Text } from "@chakra-ui/react";

interface LoginResponse {
  access: string;
  refresh: string;
}

interface LoginVariables {
  username: string;
  password: string;
}

const LoginFormContainer = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const router = useRouter();
  const { login } = useAuth();

  const mutation = useMutation<LoginResponse, Error, LoginVariables>({
    mutationFn: async ({ username, password }: LoginVariables) => {
      const response = await axios.post("http://20.52.97.229:8000/api/login/", {
        username,
        password,
      });
      return response.data;
    },
    onSuccess: (data: LoginResponse) => {
      login(data.access, data.refresh); // Hem access hem de refresh token'ı ile login çağrısı
      setSuccess("Login successful!");
      setError(undefined);
      setTimeout(() => {
        router.push("/main");
      }, 1000); // Başarı mesajını göstermek için 1 saniye bekleyin ve ardından yönlendirin
    },
    onError: (error) => {
      setError("Invalid username or password!");
      setSuccess(undefined);
    },
  });

  const handleSubmit = (username: string, password: string) => {
    setError(undefined);
    setSuccess(undefined);
    mutation.mutate({ username, password });
  };

  return (
    <Box>
      <LoginForm onSubmit={handleSubmit} />
      {error && <Text color="red" mt={2}>{error}</Text>}
      {success && <Text color="green" mt={2}>{success}</Text>}
    </Box>
  );
};

export default LoginFormContainer;
