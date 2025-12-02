import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./Layout";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import Invoice from "../pages/Invoicelist";
import Createinvoice from "../pages/Createinvoice";




export default function AppRouter() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* PUBLIC */}
          <Route path="/login" element={<Login />} />

          {/* PROTECTED */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="create-invoice" element={<Createinvoice />} />
            <Route path="invoice-list" element={<Invoice />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
