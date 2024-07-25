import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import styles from "../styles/login.module.css"

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  errorMessage?: string; //undefined
}

interface LoginResponse {
  message: string;
}

interface LoginVariables {
  email: string;
  password: string;
}

const LoginForm = ({ onSubmit, errorMessage }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl id="email">
          <FormLabel className={styles['username-title']}>Username</FormLabel>
          <Input
            type="string"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your username"
            className={styles['form-control']}
            required
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="●●●●●●●●"
            className={styles['form-control']}
            required
          />
        </FormControl>
        {errorMessage && <Text color="red.500">{errorMessage}</Text>}
        <Button colorScheme="blue" width="full" type="submit" className={styles["btn-primary"]}>
          Sign In
        </Button>
      </Stack>
    </form>
  );
};

const LoginFormContainer = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const queryClient = useQueryClient();

  const mutation = useMutation<LoginResponse, Error, LoginVariables>({
    mutationFn: async ({ email, password }: LoginVariables) => {
      // Geçici kullanıcı doğrulama
      const validEmail = "user@example.com";
      const validPassword = "password123";

      if (email === validEmail && password === validPassword) {
        return { message: "Login successful" };
      } else {
        throw new Error("Invalid Username or Password!");
      }
    },
    onSuccess: (data: LoginResponse) => {
      if (data.message === "Login successful") {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        window.location.href = "/main";
      }
    },
    onError: (error) => {
      setError(error.message); // Hata mesajını göster
    },
  });

  const handleSubmit = (email: string, password: string) => {
    mutation.mutate({ email, password });
  };

  return <LoginForm onSubmit={handleSubmit} errorMessage={error} />;
};

export default LoginFormContainer;
