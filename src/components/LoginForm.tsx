import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import styles from "../styles/login.module.css";

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
  errorMessage?: string;
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
        {errorMessage && <Text color="red">{errorMessage}</Text>}
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

export default LoginForm;
