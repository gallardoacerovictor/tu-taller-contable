import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Recetario from "./pages/Recetario";
import BolsilloDiario from "./pages/BolsilloDiario";
import PrecioJusto from "./pages/PrecioJusto";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";
import { initializeSeedData } from './lib/storage';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initializeSeedData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/recetario" element={<Recetario />} />
              <Route path="/recetario/nuevo" element={<Recetario />} />
              <Route path="/recetario/:id" element={<Recetario />} />
              <Route path="/bolsillo" element={<BolsilloDiario />} />
              <Route path="/precio" element={<PrecioJusto />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
