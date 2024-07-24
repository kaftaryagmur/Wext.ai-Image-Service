import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Heading,
  Stack,
} from '@chakra-ui/react';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
  errorMessage?: string;
}

const LoginForm = ({ onSubmit, errorMessage }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      backgroundImage="url('https://wext.ai/html/assets/images/screens/hero-illustration.webp')"
      backgroundPosition="center"
      backgroundSize="cover"
    >
      <Box
        width={{ base: '100%', md: '650px' }}
        padding="80px"
        backgroundColor="white"
        boxShadow="lg"
        borderRadius="md"
      >
        <Heading mb={6} textAlign="center" color="#40475c">
          <a href="/">Wext.ai Interface Test</a>
        </Heading>
        <Text mb={6} color="#909aa7" textAlign="center">
          Please sign-in to your account and continue to the dashboard.
        </Text>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="●●●●●●●●"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
            {errorMessage && <Text color="red.500" textAlign="center">{errorMessage}</Text>}
            <Button colorScheme="blue" width="full" type="submit">
              Sign In
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
