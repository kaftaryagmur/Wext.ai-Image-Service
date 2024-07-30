import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import LoginForm from "../components/LoginForm";
import { useRouter } from "next/router";

interface LoginResponse {
  token: string;
  message: string;
}

interface LoginVariables {
  username: string;
  password: string;
}

const LoginFormContainer = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  //const queryClient = useQueryClient();
  const router = useRouter();

  // Geçici yerel kullanıcı doğrulama
  
  const handleLogin = (username: string, password: string) => {
    const localUser = {
      username: "test@example.com",
      password: "password",
    };

    if (username === localUser.username && password === localUser.password) {
      // Giriş başarılı, ana sayfaya yönlendir
      router.push("/main");
    } else {
      // Giriş başarısız, hata mesajını göster
      setError("Invalid Username or Password!");
    }
  };


  //Kullanıcı doğrulama
  /*
  const mutation = useMutation<LoginResponse, Error, LoginVariables>({
    mutationFn: async ({ username, password }: LoginVariables) => {
      try {
        const response = await axios.post(
          "http://192.168.5.101:8000/login",
          {
            username,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error: any) {
        const message = error.response?.data?.message || "Network Error";
        throw new Error(message);
      }
    },
    onSuccess: (data: LoginResponse) => {
      if (data.message === "Login successful") {
        localStorage.setItem("token", data.token || "");
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
*/
  return <LoginForm onSubmit={handleLogin/*handleSubmit*/} errorMessage={error} />;
};

export default LoginFormContainer;
