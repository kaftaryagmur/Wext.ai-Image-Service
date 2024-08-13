// pages/main.tsx

import React from "react";
import { AuthProvider } from "@/components/AuthProvider";
import MainContentContainer from "@/containers/MainContentContainer";
import PrivateRoute from "@/components/PrivateRoute";

const MainPage = () => {
  return (
    <AuthProvider>
        <MainContentContainer />
    </AuthProvider>
  );
};

export default MainPage;
