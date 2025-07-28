import MainLayout from "@/layouts/MainLayout";
import NumberToTextPage from "@/pages/NumberToTextPage";
import DateTimePage from "@/pages/DateTimePage";
import theme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import PremiumPage from "@/pages/PremiumPage";

function App() {
  return (
    <ChakraProvider value={theme}>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/number-to-text" element={<NumberToTextPage />} />
          <Route path="/date-time" element={<DateTimePage />} />
          <Route path="/premium" element={<PremiumPage />} />
        </Routes>
      </MainLayout>
    </ChakraProvider>
  );
}

export default App;
