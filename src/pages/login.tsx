import { AuthProvider } from "@/components/AuthProvider";
import Login from "../login/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function LoginPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </QueryClientProvider>
  );
}
