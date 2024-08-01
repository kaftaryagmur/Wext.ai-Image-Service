import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import LoginForm from "../components/LoginForm";
import { useRouter } from "next/router";

interface LoginResponse {
  token?: string;
  message: string;
}

interface LoginVariables {
  username: string;
  password: string;
}

const LoginFormContainer = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const router = useRouter();

  // Kullanıcı doğrulama
  const mutation = useMutation<LoginResponse, Error, LoginVariables>({
    mutationFn: async ({ username, password }: LoginVariables) => {
      try {
        const response = await axios.post(
          "http://192.168.5.103:8000/api/login/",
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
        console.log("Response:", response.data); // Yanıtı kontrol etmek için
        return {
          token: response.data.token || "",
          message: response.data.message || "Login successful",
        };
      } catch (error: any) {
        const message = error.response?.data?.message || "Network Error";
        console.error("Error:", message); // Hata mesajını kontrol etmek için
        throw new Error(message);
      }
    },
    onSuccess: (data: LoginResponse) => {
      console.log("onSuccess:", data); // Başarı durumunu kontrol etmek için
      if (data.message === "Login successful") {
        localStorage.setItem("token", data.token || "");
        setSuccessMessage("Login successful! Redirecting...");
        setError(undefined); // Hata mesajını temizle
        setTimeout(() => {
          router.push("/main");
        }, 1000); // 1 saniye gecikme ile yönlendirme
      }
    },
    onError: (error) => {
      console.error("onError:", error.message); // Hata durumunu kontrol etmek için
      setError(error.message);
      setSuccessMessage(undefined); // Başarı mesajını temizle
    },
  });

  const handleSubmit = (username: string, password: string) => {
    setError(undefined); // Hata mesajını temizle
    setSuccessMessage(undefined); // Başarı mesajını temizle
    mutation.mutate({ username, password });
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
      <div style={{ marginTop: "10px" }}>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default LoginFormContainer;
