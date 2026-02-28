import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import SignIn from "@/pages/auth/Login";
import SignUp from "@/pages/auth/Signup";

import PublicRoute from "@/routes/PublicRoute";
import ProtectedRoute from "@/routes/ProtectedRoute";

import LoginPage from "@/pages/LoginPage";
import Dashboard from "@/pages/dashboard/Dashboard";
import {
  AllOrders,
  PendingOrders,
  PrintingOrders,
  CompletedOrders,
} from "@/pages/orders/Orders";
import {
  AllCustomers,
  AddCustomer,
  VerifiedCustomers,
  BlockedCustomers,
} from "@/pages/customers/Customers";
import {
  PaymentOverview,
  TransactionHistory,
  PendingPayments,
  Refunds,
} from "@/pages/payments/Payments";
import {
  DailyRevenue,
  MonthlyReport,
  TopCustomers,
  DownloadCSV,
} from "@/pages/reports/Reports";
import {
  AllServices,
  AddService,
  Categories,
  Discounts,
} from "@/pages/services/Services";
import {
  GeneralInfo,
  WorkingHours,
  OrderToggle,
  HolidayMode,
} from "@/pages/shop/ShopSettings";
import {
  AllFiles,
  UploadFiles,
  FileCategories,
  ArchivedFiles,
} from "@/pages/files/Files";
import {
  NotificationSettings,
  SecuritySettings,
  AccountSettings,
  Preferences,
} from "@/pages/settings/AppSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            {/* MAIN APP */}
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Orders */}
              <Route path="/orders/all" element={<AllOrders />} />
              <Route path="/orders/pending" element={<PendingOrders />} />
              <Route path="/orders/printing" element={<PrintingOrders />} />
              <Route path="/orders/completed" element={<CompletedOrders />} />

              {/* Customers */}
              <Route path="/customers/all" element={<AllCustomers />} />
              <Route path="/customers/add" element={<AddCustomer />} />
              <Route
                path="/customers/verified"
                element={<VerifiedCustomers />}
              />
              <Route path="/customers/blocked" element={<BlockedCustomers />} />

              {/* Payments */}
              <Route path="/payments/overview" element={<PaymentOverview />} />
              <Route
                path="/payments/history"
                element={<TransactionHistory />}
              />
              <Route path="/payments/pending" element={<PendingPayments />} />
              <Route path="/payments/refunds" element={<Refunds />} />

              {/* Reports */}
              <Route path="/reports/daily" element={<DailyRevenue />} />
              <Route path="/reports/monthly" element={<MonthlyReport />} />
              <Route path="/reports/top-customers" element={<TopCustomers />} />
              <Route path="/reports/download" element={<DownloadCSV />} />

              {/* Services */}
              <Route path="/services/all" element={<AllServices />} />
              <Route path="/services/add" element={<AddService />} />
              <Route path="/services/categories" element={<Categories />} />
              <Route path="/services/discounts" element={<Discounts />} />

              {/* Shop */}
              <Route path="/shop/general" element={<GeneralInfo />} />
              <Route path="/shop/hours" element={<WorkingHours />} />
              <Route path="/shop/orders-toggle" element={<OrderToggle />} />
              <Route path="/shop/holiday" element={<HolidayMode />} />

              {/* Files */}
              <Route path="/files/all" element={<AllFiles />} />
              <Route path="/files/upload" element={<UploadFiles />} />
              <Route path="/files/categories" element={<FileCategories />} />
              <Route path="/files/archived" element={<ArchivedFiles />} />

              {/* Settings */}
              <Route
                path="/settings/notifications"
                element={<NotificationSettings />}
              />
              <Route path="/settings/security" element={<SecuritySettings />} />
              <Route path="/settings/account" element={<AccountSettings />} />
              <Route path="/settings/preferences" element={<Preferences />} />
            </Route>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
