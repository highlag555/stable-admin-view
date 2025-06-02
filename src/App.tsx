
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth0Wrapper from "./components/Auth0Wrapper";
import ProtectedRoute from "./components/ProtectedRoute";
import Navigation from "./components/Navigation";
import Customers from "./pages/Customers";
import CustomerDetail from "./pages/CustomerDetail";
import Payments from "./pages/Payments";
import ApiKeys from "./pages/ApiKeys";
import Team from "./pages/Team";
import Docs from "./pages/Docs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Auth0Wrapper>
        <BrowserRouter>
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
              <Navigation />
              <Routes>
                <Route path="/" element={<Customers />} />
                <Route path="/customer/:id" element={<CustomerDetail />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/api-keys" element={<ApiKeys />} />
                <Route path="/team" element={<Team />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </ProtectedRoute>
        </BrowserRouter>
      </Auth0Wrapper>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
