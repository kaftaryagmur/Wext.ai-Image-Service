// pages/main.tsx

import React from "react";
import { AuthProvider } from "@/components/AuthProvider";
import MainContent from "@/components/MainContent";

const MainPage = () => {
  return (
    <AuthProvider>
      <MainContent searchQuery="example query" />
    </AuthProvider>
  );
};

export default MainPage;
