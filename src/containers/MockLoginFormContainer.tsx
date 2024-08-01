import { useState } from "react";
import { useRouter } from "next/router";
import LoginForm from "../components/LoginForm";

const MockLoginFormContainer = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleLogin = (username: string, password: string) => {
    setError(undefined);
    setSuccessMessage(undefined);

    // Mock yanıt
    const mockResponse = {
      token: "mock-token",
      message: "Login successful",
    };

    if (username === "test" && password === "password") {
      localStorage.setItem("token", mockResponse.token);
      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => {
        router.push("/main");
      }, 1000); // 1 saniye gecikme ile yönlendirme
    } else {
      setError("Invalid Username or Password!");
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleLogin} />
      <div style={{ marginTop: "10px" }}>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default MockLoginFormContainer;
