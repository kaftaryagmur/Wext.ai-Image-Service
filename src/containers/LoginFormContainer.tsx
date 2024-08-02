import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../components/AuthProvider";
import LoginForm from "@/components/LoginForm";

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
  const router = useRouter();
  const { login } = useAuth();

  const mutation = useMutation<LoginResponse, Error, LoginVariables>({
    mutationFn: async ({ username, password }: LoginVariables) => {
      const response = await axios.post("http://192.168.5.103:8000/api/login/", {
        username,
        password,
      });
      return response.data;
    },
    onSuccess: (data: LoginResponse) => {
      login(data.access);
      router.push("/main");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = (username: string, password: string) => {
    setError(undefined);
    mutation.mutate({ username, password });
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginFormContainer;
