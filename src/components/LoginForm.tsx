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
import styles from "../styles/login.module.css";

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
  errorMessage?: string; // undefined
}

interface LoginResponse {
  token: string; // JWT token veya benzeri bir veri
  message: string;
}

interface LoginVariables {
  username: string;
  password: string;
}

const LoginForm = ({ onSubmit, errorMessage }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl id="username">
          <FormLabel className={styles["username-title"]}>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className={styles["form-control"]}
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
            className={styles["form-control"]}
            required
          />
        </FormControl>
        {errorMessage && <Text color="red.500">{errorMessage}</Text>}
        <Button
          colorScheme="blue"
          width="full"
          type="submit"
          className={styles["btn-primary"]}
        >
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
    mutationFn: async ({ username, password }: LoginVariables) => {
      try {
        const response = await axios.post("http://localhost:8000/api/login/", {
          username,
          password,
        });
        return response.data;
      } catch (error: any) {
        const message =
          error.response?.data?.message || "Invalid Username or Password!";
        throw new Error(message);
      }
    },
    onSuccess: (data: LoginResponse) => {
      if (data.message === "Login successful") {
        localStorage.setItem("token", data.token); // Token'ı saklayın
        queryClient.invalidateQueries({ queryKey: ["user"] });
        window.location.href = "/main";
      }
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = (username: string, password: string) => {
    mutation.mutate({ username, password });
  };

  return <LoginForm onSubmit={handleSubmit} errorMessage={error} />;
};

export default LoginFormContainer;
