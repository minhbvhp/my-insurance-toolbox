import MainLayout from "@/layouts/MainLayout";
import DashboardPage from "@/pages/DashboardPage";
import SettingsPage from "@/pages/SettingsPage";
import theme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <ChakraProvider value={theme}>
      <HashRouter>
        <MainLayout>
          <Routes>
            <Route path="/my-insurance-toolbox" element={<DashboardPage />} />
            <Route
              path="/my-insurance-toolbox/settings"
              element={<SettingsPage />}
            />
          </Routes>
        </MainLayout>
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;
