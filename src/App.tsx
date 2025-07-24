import DashboardPage from "@/pages/DashboardPage";
import SettingsPage from "@/pages/SettingsPage";
import theme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "@/layouts/MainLayout";

function App() {
  return (
    <ChakraProvider value={theme}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/my-insurance-toolbox" element={<DashboardPage />} />
            <Route
              path="/my-insurance-toolbox/settings"
              element={<SettingsPage />}
            />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
