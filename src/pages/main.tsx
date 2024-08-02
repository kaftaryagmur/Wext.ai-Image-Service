import { AuthProvider } from "@/components/AuthProvider";
import MainContent from "../main/page";

const MainPage = () => {
  return (
    <AuthProvider>
      <MainContent />;
    </AuthProvider>
  );
};

export default MainPage;
