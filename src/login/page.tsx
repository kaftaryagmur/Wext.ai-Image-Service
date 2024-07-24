import { useRouter } from 'next/router';
import LoginForm from '../components/LoginForm';
import { useState } from 'react';

const Login = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/main');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit} errorMessage={error} />
  );
};

export default Login;
