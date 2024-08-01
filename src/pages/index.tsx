// pages/index.tsx
import { Button, Container, Heading, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <Container maxW="container.sm" centerContent>
      <VStack spacing={4} align="center" mt={10}>
        <Heading as="h1">Wext.ai Image Service</Heading>
        <Button 
          colorScheme="blue" 
          size="lg" 
          onClick={handleLoginRedirect}
        >
          Giriş Yap
        </Button>
      </VStack>
    </Container>
  );
};

export default HomePage;
