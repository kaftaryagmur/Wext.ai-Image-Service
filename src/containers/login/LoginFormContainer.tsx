import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../../components/AuthProvider";
import LoginForm from "../../components/login/LoginForm";
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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/login/`, // Base URL'yi .env dosyasından alıyoruz
        {
          username,
          password,
        }
      );
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
      <LoginForm onSubmit={handleSubmit} errorMessage={error} />
    </Box>
  );
};

export default LoginFormContainer;
