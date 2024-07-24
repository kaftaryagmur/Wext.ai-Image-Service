import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Stack,
    Text,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  
  interface LoginFormProps {
    onSubmit: (email: string, password: string) => void;
    errorMessage?: string;
  }
  
  const LoginForm = ({ onSubmit, errorMessage }: LoginFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(email, password);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          {errorMessage && <Text color="red.500">{errorMessage}</Text>}
          <Button colorScheme="blue" width="full" type="submit">
            Sign In
          </Button>
        </Stack>
      </form>
    );
  };
  
  export default LoginForm;
  