import MainLayout from "@/layouts/MainLayout";
import NumberToTextPage from "@/pages/NumberToTextPage";
import SettingsPage from "@/pages/SettingsPage";
import theme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <ChakraProvider value={theme}>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/number-to-text" element={<NumberToTextPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </MainLayout>
    </ChakraProvider>
  );
}

export default App;
