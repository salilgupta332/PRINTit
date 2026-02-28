import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import AssignmentService from "./pages/AssignmentService";
import ClassNotesService from "./pages/ClassNotesService";
import ServicePage from "./pages/ServicePage";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="assignment" element={<AssignmentService />} />
                <Route path="class-notes" element={<ClassNotesService />} />
                <Route path="notes" element={<ServicePage />} />
                <Route path="official-docs" element={<ServicePage />} />
                <Route path="exam-utilities" element={<ServicePage />} />
                <Route path="business" element={<ServicePage />} />
                <Route path="bulk" element={<ServicePage />} />
                <Route path="profile" element={<Profile />} />
                <Route path="orders" element={<DashboardHome />} />
                <Route path="help" element={<ServicePage />} />
                <Route path="settings" element={<ServicePage />} />
                {/* Add future service routes here */}
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
